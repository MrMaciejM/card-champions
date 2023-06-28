import "./App.css";
import React, {useState, useEffect} from "react"; 

// image/gif assets 
import waterCard from "./assets/water-card.gif";
import fireCard from "./assets/fire-card.gif";
import grassCard from "./assets/grass-card.gif";
import cardDeck from "./assets/card-deck.gif";
import testCard from "./assets/placeholder-card.png";

// sound assets
import waterSound from "./assets/Water-bubbles-fixed.mp3";
import fireSound from "./assets/Fire-intense.mp3";
import grassSound from "./assets/Leaves-rustle.mp3";
import scoreSound from "./assets/score-sound.mp3";
import zapSound from "./assets/zap-effect.mp3";

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [waterValue] = useState("water");
  const [fireValue] = useState("fire");
  const [grassValue] = useState("grass");

  const [testCardPath, setTestCardPath] = useState(testCard);

  /*
    Index: 
    - Sound effect for cards - 34
    - Sound effects for won and loss rounds - 58
    - Animation of battle cards - 74
    - Delay action and card appearance - 99
    - Handle player choice, value depends on the card clicked - 114
    - Game logic - 123
  */

  // Sound effect for cards
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
        grassAudio.volume = 0.3;
        grassAudio.play();
        break;

        default: 
        console.log("Sound not found, or could not be played");
    }
  }

  // Sound effects for won and loss rounds
  function wonRoundSound() {
    const wonSound = new Audio(scoreSound);
    wonSound.volume = 0.3;
    setTimeout(() => {
      wonSound.play();
    }, 500);
  }
  function lostRoundSound() {
    const lossRound = new Audio(zapSound);
    lossRound.volume = 0.3;
    setTimeout(() => {
      lossRound.play();
    }, 500);
  }

// Animation of battle cards 
function spinAnimationLeft() {
  const leftBattleCard = document.getElementById("battleCardLeft")
  //console.log("left battlecard: " + leftBattleCard);
  leftBattleCard.classList.add("rotate-animation"); 
  leftBattleCard.addEventListener(
    "animationend", () => {
      leftBattleCard.classList.remove("rotate-animation");
    }
  )   
}

const rightBattleCard = document.getElementById("battleCardRight")

function spinAnimationRight() {
  rightBattleCard.classList.add("rotate-animation"); 
  rightBattleCard.addEventListener(
    "animationend", () => {
      rightBattleCard.classList.remove("rotate-animation");
    }
  )   
}

// Delay action and card appearance 
function delayAction(element) {
  //console.log("element result:" + element);
  spinAnimationLeft(); 
  setTimeout(() => {
    if(element === "water") {
      setTestCardPath(waterCard); 
    }
  }, 1000); 
  setTimeout(() => {        
    console.log("Timed out - 5 seconds");
    setTestCardPath(testCard); 
  }, 5000); 
}

  // Handle player choice - value depends on the card clicked
  const handlePlayerChoice = (value) => {
    cpuLogic(value);
    soundEffect(value);
    delayAction(value);
  };

  // game logic
  useEffect(() => {
    console.log("playerScore:", playerScore);
    console.log("CPUScore:", cpuScore);
  }, [playerScore, cpuScore]);
 
  function cpuLogic (playerChoice) {
    const elements = ["water", "fire", "grass"]; 
    let randomiser = Math.floor(Math.random() * 3);
    let cpuChoice = elements[randomiser]; 
    console.log("player choice: " + playerChoice);
    console.log("rnd result: " + elements[randomiser]);

    setTimeout(() => { 
    if (playerChoice === cpuChoice) {
      //console.log("DRAW!");
    }
    else if (playerChoice === "water" && cpuChoice === "grass") {
      setCpuScore(prevScore => prevScore + 1); 
      lostRoundSound()
    }
    else if (playerChoice === "water" && cpuChoice === "fire") {
      setPlayerScore(prevScore => prevScore + 1); 
      wonRoundSound();
    }  
    else if (playerChoice === "fire" && cpuChoice === "grass") {
      setPlayerScore(prevScore => prevScore + 1); 
      wonRoundSound();
    }
    else if (playerChoice === "fire" && cpuChoice === "water") {
      setCpuScore(prevScore => prevScore + 1); 
      lostRoundSound();
    }
    else if (playerChoice === "grass" && cpuChoice === "water") {
      setPlayerScore(prevScore => prevScore + 1); 
      wonRoundSound();
    }
    else if (playerChoice === "grass" && cpuChoice === "fire") {
      setCpuScore(prevScore => prevScore + 1); 
      lostRoundSound();
    } 
  }, 3000); 
  console.log("149: playerScore: " + playerScore)
    
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
          <img id="battleCardLeft" className={`testCard`}  alt="aa" src={testCardPath} onClick={() => {
            //spinAnimationLeft();
          }}/>
          <img id="battleCardRight" className="testCard" alt="aa" src={testCard}
          onClick={() => {
            //spinAnimationRight();
          }}/>
          </div>
        <div className="cardDeckDiv">
          {/* prettier-ignore */}
          <img id="cardDeckImg" className="elemCards" src={cardDeck} alt="water card" />
        </div>
      </div>
      <p className="copyright">Copyright © {dateFormatted} - Maciej M</p>
    </main>
  );
}

export default App;
