import "./App.css";
import GameInstructions from "./instructions"; 
import React, {useState, useEffect} from "react"; 

// image/gif assets 
import waterCard from "./assets/water-card.gif";
import fireCard from "./assets/fire-card.gif";
import grassCard from "./assets/grass-card.gif";
import cardDeck from "./assets/card-deck.gif";
import mysteryCard from "./assets/mysteryCardFinal.gif"

// sound assets
import waterSound from "./assets/Water-bubbles-fixed.mp3";
import fireSound from "./assets/Fire-intense.mp3";
import grassSound from "./assets/Leaves-rustle.mp3";
import scoreSound from "./assets/score-sound.mp3";
import zapSound from "./assets/zap-effect.mp3";

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [victor, setVictor] = useState("Challenger"); 

  const [waterValue] = useState("water");
  const [fireValue] = useState("fire");
  const [grassValue] = useState("grass");

  const [leftCardPath, setleftCardPath] = useState(mysteryCard);
  const [rightCardPath, setRightCardPath] = useState(mysteryCard);

  // Sound effect for cards
  function soundEffect(element) {
    switch(element) {
      case "water":
        const waterAudio = new Audio(waterSound);
        waterAudio.play();
        break;
      case "fire":
        const fireAudio = new Audio(fireSound);
        fireAudio.volume = 0.2;
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
    setleftCardPath(mysteryCard); 
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
    setRightCardPath(mysteryCard); 
  }, 5000); 
}

  // declare winner/loser and show play again option
  function showVictor() {
    const winnerDivEl = document.getElementById("winnerDiv")
    if (playerScore === 5) {    
      setVictor("Challenger")
      winnerDivEl.classList.remove("hide"); 
    }
     else if (cpuScore === 5) {
      setVictor("Card Champion")
      winnerDivEl.classList.remove("hide"); 
     }
  }

  function newGame() {
    const winnerDivEl = document.getElementById("winnerDiv")
    setCpuScore(0);
    setPlayerScore(0); 
    winnerDivEl.classList.add("hide"); 
  }

  // Handle player choice - value depends on the card clicked
  const handlePlayerChoice = (value) => {
    cpuLogic(value);
    soundEffect(value);
    delayActionAndSetPlayerCard(value);
  };

  // Game logic and set scores
  useEffect(() => {
    showVictor();
  }, [playerScore, cpuScore]);
 
  function cpuLogic (playerChoice) {
    const elements = ["water", "fire", "grass"]; 
    let randomiser = Math.floor(Math.random() * 3);
    let cpuChoice = elements[randomiser]; 
    delayActionAndSetCpuCard(cpuChoice); 

    if(playerScore === 5 || cpuScore === 5) {
      return;
    } else {    
    setTimeout(() => { 
      // DRAW! 
    if (playerChoice === cpuChoice) {
      // show / hide draw result 
      const showDrawResultEl = document.getElementById("showDrawResult"); 
      showDrawResultEl.classList.remove("hide"); 
      setTimeout(() => {
        showDrawResultEl.classList.add("hide"); 
      }, 2000)
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
  }

  // date for copyright 
  const currentDate = new Date();
  const dateFormatted = currentDate.getFullYear(); 
  
  return (
    <main>
      <header>
        <div></div>
      <h1>Card Champions</h1>
      <GameInstructions />
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
            <div id="winnerDiv" className="hide">
              <div>
                <p id="winnerPara">Winner:<br/>{victor}</p>
                <button id="btnPlayAgain" onClick={newGame}>Play Again</button>
              </div>
            </div>
            <p id="showDrawResult" className="hide">Draw!</p>
          <img id="battleCardLeft" className={`mysteryCard`}  alt="aa" src={leftCardPath} />
          <img id="battleCardRight" className="mysteryCard" alt="aa" src={rightCardPath}  />
          </div>
        <div className="cardDeckDiv">
          {/* Champion Card */}
          {/* prettier-ignore */}
          <img id="cardDeckImg" className="elemCards" src={cardDeck} alt="water card" />
        </div>
      </div>
      <p className="copyright">Copyright © {dateFormatted} - Maciej M</p>
    </main>
  );
}

export default App;
