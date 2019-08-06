import React from "react";
import "./react-pairs-game.css";
import {Card} from "./card";

export function ReactPairsGame({deckSize, deckTheme}) {
    const cards = [];
    for (let i = 0; i < deckSize; i++) {
        cards.push(<Card label={i} key={i}/>);
    }
    return (
        <div className={`rp-playground ${deckTheme}`}>
            {cards}
        </div>
    );
}