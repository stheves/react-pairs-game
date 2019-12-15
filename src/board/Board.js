import React from 'react';
import { useGame } from '../Game';
import Layout from './Layout';
import CardComponent from '../card/CardComponent';
import operations from '../operations';

const Board = () => {
   const [game, dispatch] = useGame();

   const handleSwitchCard = cardId => {
      dispatch(operations.switchCard(cardId));
   };

   const Cards = game.board.cards.map((card, i) => (
      <CardComponent
         key={i}
         card={card}
         onCardClick={() => handleSwitchCard(card.id)}
      />
   ));
   return <Layout>{Cards}</Layout>;
};

export default Board;
