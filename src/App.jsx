import "./App.css";
import React, {useState} from "react"; 

// image assets 
import waterCard from "./assets/water-card.gif";
import fireCard from "./assets/fire-card.gif";
import grassCard from "./assets/grass-card.gif";
import cardDeck from "./assets/card-deck.gif";
import testCard from "./assets/placeholder-card.png";

// sound assets
import waterSound from "./assets/Water-bubbles.mp3";
import fireSound from "./assets/Fire-intense.mp3";
import grassSound from "./assets/Leaves-rustle.mp3";
import scoreSound from "./assets/score-sound.mp3";
import zapSound from "./assets/zap-effect.mp3";


function App() {
  let playerScore = 0;
  let cpuScore = 0;

  const [waterValue] = useState("water");
  const [fireValue] = useState("fire");
  const [grassValue] = useState("grass");
  
  // sound effect for cards
  function soundEffect(element) {
    switch(element) {
      case "water":
        const waterAudio = new Audio(waterSound);
        waterAudio.play();
        break;
      case "fire":
        const fireAudio = new Audio(fireSound);
        fireAudio.volume = 0.3;
        fireAudio.play();
        break;
      case "grass":
        const grassAudio = new Audio(grassSound);
        grassAudio.volume = 0.5;
        grassAudio.play();
        break;

        default: 
        console.log("Sound not found, or could not be played");
    }
  }

  // sounds for won and loss rounds
  function wonRoundSound() {
    const wonSound = new Audio(scoreSound);
    wonSound.volume = 1;
    setTimeout(() => {
      wonSound.play();
    }, 3000);
    
  }
  function lostRoundSound() {
    const lossRound = new Audio(zapSound);
    lossRound.volume = 1;
    setTimeout(() => {
      lossRound.play();
    }, 3000);
    
  }


  // player choice - value depends on the card clicked
  const handlePlayerChoice = (value) => {
    cpuLogic(value);
    soundEffect(value);
  };

  // game logic
  function cpuLogic (playerChoice) {
    const elements = ["water", "fire", "grass"]; 
    let randomiser = Math.floor(Math.random() * 3);
    let cpuChoice = elements[randomiser]; 
    console.log("player choice: " + playerChoice);
    console.log("rnd result: " + elements[randomiser]);

    if (playerChoice === cpuChoice) {
      console.log("DRAW!");
      gameScore();
    }
    else if (playerChoice === "water" && cpuChoice === "grass") {
      cpuScore++;
      lostRoundSound()
      gameScore();
    }
    else if (playerChoice === "water" && cpuChoice === "fire") {
      console.log("Player score var = " + playerScore);
      playerScore++;
      wonRoundSound();
      gameScore(); 
    }
    else if (playerChoice === "fire" && cpuChoice === "grass") {
      playerScore++;
      wonRoundSound();
      gameScore(); 
    }
    else if (playerChoice === "fire" && cpuChoice === "water") {
      cpuScore++;
      lostRoundSound();
      gameScore(); 
    }
    else if (playerChoice === "grass" && cpuChoice === "water") {
      playerScore++;
      wonRoundSound();
      gameScore(); 
    }
    else if (playerChoice === "grass" && cpuChoice === "fire") {
      cpuScore++;
      lostRoundSound();
      gameScore(); 
    }
  }

  function gameScore() {
    let playerScoreElement = document.getElementById("playerScore")
    let cpuScoreElement = document.getElementById("cpuScore")
    playerScoreElement.textContent = `Player 1: ${playerScore}`; 
    cpuScoreElement.textContent = `Player 2: ${cpuScore}`; 
  }

  // date for copyright 
  const currentDate = new Date();
  const dateFormatted = currentDate.getFullYear(); 
  
  return (
    <main>
      <h1>Card Champions</h1>
      <h2>Score</h2>
      <div className="playerScoresDiv">
      <h3 id="playerScore">Challenger: {playerScore}</h3>
      <h3 id="cpuScore">Card Champion: {cpuScore}</h3>
      </div>

      <div className="cardsContainer">
        <div id="tripleCardsDiv">
          {/* prettier-ignore */}
          <img id="waterCardImg" className="elemCards" src={waterCard} alt="water card" onClick={() => handlePlayerChoice(waterValue)} />
          <img id="fireCardImg" className="elemCards" src={fireCard} alt="fire card" onClick={() => handlePlayerChoice(fireValue)} />
          <img id="grassCardImg" className="elemCards" src={grassCard} alt="grass card" onClick={() => handlePlayerChoice(grassValue)} />
        </div>
          <div id="cardBattleDiv">
          <img className="testCard" alt="aa" src={testCard}/>
          <img className="testCard" alt="aa" src={testCard}/>
          </div>
        <div className="cardDeckDiv">
          {/* prettier-ignore */}
          <img id="cardDeckImg" className="elemCards" src={cardDeck} alt="water card" />
        </div>
      </div>
      <p className="copyright">Copyright © {dateFormatted} - Maciej</p>
    </main>
  );
}

export default App;
