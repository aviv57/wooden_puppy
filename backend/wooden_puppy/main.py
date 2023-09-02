from pydantic import BaseModel
from fastapi import FastAPI
from challenge import ChallengesCollectionBase, Challenge

class Global:
    challenges = [
        Challenge(None, "How much is 1+1?", '2'),
        Challenge('password1-abc', "What is the color of the sky?", 'Blue'),
        Challenge('password2-ABC', "How many days are in a week?", '7'),
        Challenge('password3-123', "What is 'rats' spelled backwards?", 'Star'),
    ]
    challenges_dict = ChallengesCollectionBase(challenges).get_challenges()


app = FastAPI()

@app.get("/challenge/{challenge_password}")
async def get_challenge(challenge_password):
    challenge = Global.challenges_dict.get(challenge_password, Global.challenges_dict[None])
    return {'challange': challenge.prompt}

class SolveChallengeRequestBody(BaseModel):
    solution: str

@app.post("/solve_challenge/{challenge_password}")
async def solve_challenge(challenge_password, request_body: SolveChallengeRequestBody):
    challenge = Global.challenges_dict.get(challenge_password, Global.challenges_dict[None])
    return_value = {'solution': 'Incorrect.', 'next_challenge_password': None}
    if challenge.solution == request_body.solution:
        return_value = {'solution': 'Correct!'}
        return_value['next_challenge_password'] = challenge.next_challenge and challenge.next_challenge.password
    return return_value