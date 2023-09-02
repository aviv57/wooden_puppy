from dataclasses import dataclass, asdict
from typing import Optional, List

@dataclass
class Challenge:
    password: Optional[str]
    prompt: str
    solution: str
    next_challenge: Optional['Challenge'] = None


class ChallengesCollectionBase:
    def __init__(self, challenges: List[Challenge]) -> None:
        self.challenges = challenges
        self.challenges_dict = {}
        self._build_challanges_dict()
    
    def _build_challanges_dict(self):
        if not self.challenges:
            return
        for i, c in enumerate(self.challenges[:-1]):
            c.next_challenge = self.challenges[i+1]
            self.challenges_dict[c.password] = c
        last_challenge = self.challenges[-1]
        self.challenges_dict[last_challenge.password] = last_challenge

    def get_challenges(self):
        return_value = {}
        for k, v in self.challenges_dict.items():
            challenge_dict = asdict(v)
            next_challenge = None
            if v.next_challenge:
                next_challenge = Challenge(v.next_challenge.password, v.next_challenge.prompt, v.next_challenge.solution)
            else:
                del challenge_dict['next_challenge']
            return_value[k] = Challenge(**asdict(v))
            return_value[k].next_challenge = next_challenge
        return return_value

