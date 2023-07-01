import React, {useState} from "react"; 
import papyrusImg from "./assets/papyrus.png";

function Instructions() {
    const [showInstructions, setShowInstructions] = useState(false);
    function renderInstructions() {
        setShowInstructions(true);
    }
    function hideInstructions() {
        setShowInstructions(false); 
    }
    return (
        <div>
            <img id="instructionsElement" src={papyrusImg}alt="instructions" onClick={renderInstructions}/>
            {showInstructions && (
        <div className="instructionsDiv" onClick={hideInstructions}>
          <p >Welcome Challenger!</p>
          <br></br>
          <p>The rules of the game are simple, you must beat the <strong>Card Champion</strong> using the elemental cards at your disposal.
          <br></br>First to five wins!</p><br></br>
          <p>Fire <strong className="strongOne">beats</strong> Grass</p>
          <p>Water <strong className="strongTwo">beats</strong> Fire</p>
          <p>Grass <strong className="strongThree">beats</strong> Water</p>
          <br></br>
          <p>Card Champion's random algorithm is mighty, but with this knowledge you have a chance, good luck!</p>
          <br></br>
          <p>(click here to close)</p>
        </div>
      )}
        </div>
    )
}
export default Instructions; 