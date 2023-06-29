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
          <p>The rules of the game are simple, you must beat the <strong>Card Champion</strong> using the elemental cards at your disposal: <br></br>fire, water, and grass.</p><br></br>
          <p>Fire beats Grass</p>
          <p>Water beats Fire</p>
          <p>Grass beats Water</p>
          <br></br>
          <p>Card Champion's random algorithm is mighty, but with this knowledge you have a chance, good luck!</p>
          <br></br>
          <p>(click to dismiss)</p>
        </div>
      )}
        </div>
    )
}

export default Instructions; 