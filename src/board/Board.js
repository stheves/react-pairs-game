import React from 'react';
import Layout from './Layout';
import CardComponent from './CardComponent';
import { useGame } from '../game/Game';
import actions from '../actions';

const Board = () => {
   const [game, dispatch] = useGame();

   function handleClickCard(cardId) {
      if (game.board.disabled) {
         return;
      }
      dispatch(actions.selectCard(cardId));
   }

   const Cards = game.board.cards.map((card, i) => (
      <CardComponent
         key={i}
         card={card}
         onCardClick={() => handleClickCard(card.id)}
      />
   ));

   return <Layout>{Cards}</Layout>;
};

export default Board;
