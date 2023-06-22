import "./App.css";
import waterCard from "./assets/water-card.gif";
import fireCard from "./assets/fire-card.gif";
import grassCard from "./assets/grass-card.gif";
import cardDeck from "./assets/card-deck.gif";

import score from "./Score";

function App() {
  return (
    <main>
      <h1 alt="Card Champions">Card Champions</h1>
      <div className="cardsContainer">
        <div>
          {/* prettier-ignore */}
          <img id="cardDeckImg" className="elemCards" src={cardDeck} alt="water card" onClick={score} />
        </div>
        <div>
          {/* prettier-ignore */}
          <img id="cardDeckImg" className="elemCards" src={cardDeck} alt="water card" onClick={score} />
        </div>
      </div>
    </main>
  );
}

export default App;
