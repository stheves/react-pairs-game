import React from "react";
import "./App.css";
import { ReactPairsGame } from "./react-pairs-game";

function App() {
    return (
        <div className="App">
            <ReactPairsGame deckSize={16} deckTheme={"Marvel"} />
        </div>
    );
}

export default App;
