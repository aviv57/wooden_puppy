import React, {useEffect, useState} from 'react';
import axios from 'axios'
import logo from './logo.jpg';
import congragulationsLogo from './congratulations.jpeg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [challengePassword, setChallengePassword] = useState('');
  const [solution, setSolution] = useState('');
  const [challengePrompt, setChallengePrompt] = useState('Loading');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const getChallenge = async () => {
    let { data } = await axios.get(process.env.REACT_APP_API_URL + '/challenge/' + (challengePassword !== '' ? challengePassword : '0'));
    setChallengePrompt(data.challenge);
  };

  useEffect(() => {
    getChallenge();
  });  

  function challengePasswordOnChange(event: React.FormEvent<HTMLInputElement>) {
    setChallengePassword(event.currentTarget.value)
  }  

  function solutionOnChange(event: React.FormEvent<HTMLInputElement>) {
    setSolution(event.currentTarget.value)
  }
  
  const checkSolution = async () => {
    let { data } = await axios.post(process.env.REACT_APP_API_URL + '/solve_challenge/' + (challengePassword !== '' ? challengePassword : '0'), {"solution": solution});
    setFeedback(data.solution)
    if (data.solution === "Correct!")
    {
      let password = data.next_challenge_password;
      if (password){
        let new_challenge_response = await axios.get(process.env.REACT_APP_API_URL + '/challenge/' + password);
        setChallengePassword(password);
        setChallengePrompt(new_challenge_response.data.challenge);
      }
      else
      {
        setChallengePassword('');
        setSolution('');
        setGameOver(true);
      }
      
    }
  }

  const playAgain = async () =>
  {
    setGameOver(false);
    await getChallenge();
  }
  
  return (
<div className="form-body">
    <div className="row">
      <div className="form-holder">
        <div className="form-content">
          <div className="form-items">
            <h3>Wooden Puppy</h3>
            {!gameOver &&
              <div>
                <img src={logo} className="App-logo" alt="logo" />
                <div className="col-md-12">
                  <label className="mt-3">Challenge password:
                  </label>
                  <input
                      className="form-control"
                      type="text"
                      placeholder="Challenge Password"
                      value={challengePassword}
                      onChange={challengePasswordOnChange}
                    />
                </div>
                <div className="col-md-12">
                  <label className="mt-3">Challenge:</label>
                </div>
                <div className="col-md-12">
                  <label>{challengePrompt}</label>
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Solution"
                    value={solution}
                    onChange={solutionOnChange}
                  />
                </div>
                {feedback !== '' &&
                  <label className="mt-3">{feedback}</label>
                  }
                <div className="form-button mt-3">
                  <button onClick={() => checkSolution()} type="submit" className="btn btn-primary">
                    Check solution
                    </button>                 
                </div>
              </div>
             }
             {gameOver &&
              <div>
                <img src={congragulationsLogo} className="App-logo" alt="logo" />
                <div className="col-md-12">
                  <p className="mt-3 fs-2">Congragulations!</p>
                </div>              
                <div className="form-button mt-3">
                  <button onClick={() => playAgain()} type="submit" className="btn btn-primary">
                    Play Again
                    </button>                 
                </div>
              </div>
             }             
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>
  //         Wooden Puppy.
  //       </h1>
  //       <img src={logo} className="App-logo" alt="logo" />
  //     </header>
  //     <div className="form-body">
  //         <label className="row">Challenge Password:
  //           <input 
  //             type="text"
  //             id="challengePassword"
  //             required
  //             value={challengePassword}
  //             onChange={challengePasswordOnChange}
  //             name="challengePassword"
  //           />
  //         </label>
  //         <div className="row">
  //           <h3>Challenge: {challengePrompt} </h3>
  //         </div>
  //         <label className="row">Solution: 
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="solution"
  //           required
  //           value={solution}
  //           onChange={solutionOnChange}
  //           name="solution"
  //           />
  //         </label>          

  //     </div>
  //   </div>
  // );
}

export default App;


/* <div className="App-container">
{!gameOver &&
<div>
  // <div className="App-col-47"> 
    {/* <h3>Challenge: {challengePrompt} </h3>
    <label>Challenge Password:</label>
    <input
      type="text"
      className="form-control"
      id="challengePassword"
      required
      value={challengePassword}
      onChange={challengePasswordOnChange}
      name="challengePassword"
    />
    <label>Solution: </label>
    <input
      type="text"
      className="form-control"
      id="solution"
      required
      value={solution}
      onChange={solutionOnChange}
      name="solution"
    />
  <button onClick={() => checkSolution()}>
    Check solution
  </button> 
</div>}
</div>
<div>
{gameOver && 
<div>
  <h1>You Won!</h1>
  <button onClick={() => playAgain()}>
    Play Again
  </button>
</div>
}
</div>
*/