import "./App.css";
import waterCard from "./assets/water-card.gif";
import fireCard from "./assets/fire-card.gif";
import grassCard from "./assets/grass-card.gif";
import cardDeck from "./assets/card-deck.gif";

import React, {useState} from "react"; 


function App() {
  let player1Score = 0;
  let player2Score = 0;
  const [waterValue] = useState("water");
  const [fireValue] = useState("fire");
  const [grassValue] = useState("grass");
  // 0 = water | 1 = fire | 2 = grass

  // value is e.g. fireValue above, depending on card clicked
  const handlePlayerChoice = (value) => {
    cpuLogic(value);
  };

  // game logic
  function cpuLogic (playerChoice) {
    const elements = ["water", "fire", "grass"]; 
    let randomiser = Math.floor(Math.random() * 3);
    let cpuChoice = elements[randomiser]; 
    console.log("player choice: " + playerChoice);
    //console.log("player 1 choice: " + playerChoice);
    console.log("rnd result: " + elements[randomiser]);
    //console.log(cpuChoice);

    if (playerChoice === cpuChoice) {
      console.log("DRAW!");
      gameScore();
    }
    else if (playerChoice === "water" && cpuChoice === "grass") {
      player2Score++;
      gameScore();
    }
    else if (playerChoice === "water" && cpuChoice === "fire") {
      player1Score++;
      gameScore(); 
    }
    else if (playerChoice === "fire" && cpuChoice === "grass") {
      player1Score++;
      gameScore(); 
    }
    else if (playerChoice === "fire" && cpuChoice === "water") {
      player2Score++;
      gameScore(); 
    }
    else if (playerChoice === "grass" && cpuChoice === "water") {
      player1Score++;
      gameScore(); 
    }
    else if (playerChoice === "grass" && cpuChoice === "fire") {
      player2Score++;
      gameScore(); 
    }
  }

  function gameScore() {
    console.log("player 1 score: " + player1Score);
    console.log("player 2 score: " + player2Score);
  }
  

  return (
    <main>
      <h1>Card Champions</h1>
      <h2>Score</h2>
      <div className="playerScoresDiv">
      <h3>Player 1: {player1Score}</h3>
      <h3>Player 2: {player2Score}</h3>
      </div>

      <div className="cardsContainer">
        <div>
          {/* prettier-ignore */}
          <img id="waterCardImg" className="elemCards" src={waterCard} alt="water card" onClick={() => handlePlayerChoice(waterValue)} />

          <img id="fireCardImg" className="elemCards" src={fireCard} alt="fire card" onClick={() => handlePlayerChoice(fireValue)} />

          <img id="grassCardImg" className="elemCards" src={grassCard} alt="grass card" onClick={() => handlePlayerChoice(grassValue)} />
        </div>
        <div>
          {/* prettier-ignore */}
          <img id="cardDeckImg" className="elemCards" src={cardDeck} alt="water card" />
        </div>
      </div>
    </main>
  );
}

export default App;
