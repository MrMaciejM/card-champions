import "./App.css";
import React, {useState} from "react"; 

import waterCard from "./assets/water-card.gif";
import fireCard from "./assets/fire-card.gif";
import grassCard from "./assets/grass-card.gif";
import cardDeck from "./assets/card-deck.gif";


function App() {
  let playerScore = 0;
  let cpuScore = 0;

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
      cpuScore++;
      gameScore();
    }
    else if (playerChoice === "water" && cpuChoice === "fire") {
      console.log("Player score var = " + playerScore);
      playerScore++;
      gameScore(); 
    }
    else if (playerChoice === "fire" && cpuChoice === "grass") {
      playerScore++;
      gameScore(); 
    }
    else if (playerChoice === "fire" && cpuChoice === "water") {
      cpuScore++;
      gameScore(); 
    }
    else if (playerChoice === "grass" && cpuChoice === "water") {
      playerScore++;
      gameScore(); 
    }
    else if (playerChoice === "grass" && cpuChoice === "fire") {
      cpuScore++;
      gameScore(); 
    }
  }

  function gameScore() {
    let playerScoreElement = document.getElementById("playerScore")
    let cpuScoreElement = document.getElementById("cpuScore")
    playerScoreElement.textContent = `Player 1: ${playerScore}`; 
    cpuScoreElement.textContent = `Player 2: ${cpuScore}`; 
  }
  
  return (
    <main>
      <h1>Card Champions</h1>
      <h2>Score</h2>
      <div className="playerScoresDiv">
      <h3 id="playerScore">Player 1: {playerScore}</h3>
      <h3 id="cpuScore">Player 2: {cpuScore}</h3>
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
