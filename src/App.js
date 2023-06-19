import "./App.css";
import waterCard from "./assets/water-card.gif";
import fireCard from "./assets/fire-card.gif";
import grassCard from "./assets/grass-card.gif";

function App() {
  return (
    <div className="cardsContainer">
      <div>
        {/* prettier-ignore */}
        <img id="waterCardImg" className="elemCards" src={waterCard} alt="water card" />
      </div>
      <div>
        {/* prettier-ignore */}
        <img id="fireCardImg"  className="elemCards"src={fireCard} alt="fire card" />
      </div>
      <div>
        {/* prettier-ignore */}
        <img id="grassCardImg"  className="elemCards"src={grassCard} alt="grass card" />
      </div>
    </div>
  );
}

export default App;
