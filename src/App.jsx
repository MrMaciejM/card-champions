import "./App.css";
import Instructions from "./instructions"; 
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

  const [leftCardPath, setleftCardPath] = useState(testCard);
  const [rightCardPath, setRightCardPath] = useState(testCard);

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
    }, 250);
  }
  function lostRoundSound() {
    const lossRound = new Audio(zapSound);
    lossRound.volume = 0.3;
    setTimeout(() => {
      lossRound.play();
    }, 200);
  }

// Animation of battle cards 
function spinAnimationLeft() {
  const leftBattleCard = document.getElementById("battleCardLeft")
  leftBattleCard.classList.add("rotate-animation"); 
  leftBattleCard.addEventListener(
    "animationend", () => {
      leftBattleCard.classList.remove("rotate-animation");
    }
  )   
}

function spinAnimationRight() {
  const rightBattleCard = document.getElementById("battleCardRight")
  rightBattleCard.classList.add("rotate-animation"); 
  rightBattleCard.addEventListener(
    "animationend", () => {
      rightBattleCard.classList.remove("rotate-animation");
    }
  )   
}

// Delay action and set player card appearance 
function delayActionAndSetPlayerCard(element) {
  spinAnimationLeft(); 
  setTimeout(() => {
    if(element === "water") {
      setleftCardPath(waterCard); 
    }
    else if(element === "fire") {
      setleftCardPath(fireCard); 
    }
    else if(element === "grass") {
      setleftCardPath(grassCard); 
    }
  }, 1000); 
  setTimeout(() => {        
    console.log("Timed out - 5 seconds");
    setleftCardPath(testCard); 
  }, 5000); 
}

// Delay action and set CPU card appearance 
function delayActionAndSetCpuCard(element) {
  spinAnimationRight(); 
  setTimeout(() => {
    if(element === "water") {
      setRightCardPath(waterCard); 
    }
    else if(element === "fire") {
      setRightCardPath(fireCard); 
    }
    else if(element === "grass") {
      setRightCardPath(grassCard); 
    }
  }, 1000); 
  setTimeout(() => {        
    console.log("CPU Timed out - 5 seconds");
    setRightCardPath(testCard); 
  }, 5000); 
}

  // Handle player choice - value depends on the card clicked
  const handlePlayerChoice = (value) => {
    cpuLogic(value);
    soundEffect(value);
    delayActionAndSetPlayerCard(value);
  };

  // Game logic and set scores
  useEffect(() => {
    console.log("playerScore:", playerScore);
    console.log("CPUScore:", cpuScore);
  }, [playerScore, cpuScore]);
 
  function cpuLogic (playerChoice) {
    const elements = ["water", "fire", "grass"]; 
    let randomiser = Math.floor(Math.random() * 3);
    let cpuChoice = elements[randomiser]; 
    //console.log("player choice: " + playerChoice);
    //console.log("rnd result: " + elements[randomiser]);
    delayActionAndSetCpuCard(cpuChoice); 

    if(playerScore === 5 || cpuScore === 5) {
      console.log("game over!");
      return;
    } else {    
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
  }, 3000)}; 
  // delays score update 
  console.log("149: playerScore: " + playerScore)
    
  }

  // date for copyright 
  const currentDate = new Date();
  const dateFormatted = currentDate.getFullYear(); 
  
  return (
    <main>
      <header>
        <div></div>
      <h1>Card Champions</h1>
      <Instructions /> 
      </header>
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
          <img id="battleCardLeft" className={`testCard`}  alt="aa" src={leftCardPath} />
          <img id="battleCardRight" className="testCard" alt="aa" src={rightCardPath}  />
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
