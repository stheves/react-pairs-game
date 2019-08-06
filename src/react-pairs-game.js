import React, {useState} from "react";
import "./react-pairs-game.css";
import {Card, CardSide} from "./card";

const defaultGameContext = {
    cardId: null,
    updateCardSide: (cardId) => {
    },
};

export const GameContext = React.createContext(defaultGameContext);

export function ReactPairsGame({deckSize, deckTheme}) {
    const [gameState, setGameState] = useState({
        updateCardSide: (cardId, side) => {
            console.log("update card: " + cardId + " " + (side === CardSide.BACK ? "Back" : "Front"));
            setGameState({...gameState, cardId: cardId});
        }
    });

    function shuffleCards() {
        const cards = [];
        for (let i = 0; i < deckSize; i++) {
            cards.push(<Card label={String(i)} key={i}/>);
        }
        return cards;
    }

    const cards = shuffleCards();
    return (
        <GameContext.Provider value={gameState}>
            <div className={`rp-playground ${deckTheme}`}>
                {cards}
            </div>
        </GameContext.Provider>
    );
}