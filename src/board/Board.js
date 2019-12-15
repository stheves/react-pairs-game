import React from 'react';
import { useGame } from '../Game';
import Layout from './Layout';
import CardComponent from '../card/CardComponent';
import operations from '../operations';
import BoardComponent from './BoardComponent';
import Menu from './Menu';

const Board = () => {
   const [game, dispatch] = useGame();

   const handleSwitchCard = cardId => {
      dispatch(operations.switchCard(cardId));
   };

   const onClickStartGame = () => {
      dispatch(operations.startGame());
   };

   const Cards = game.board.cards.map((card, i) => (
      <CardComponent
         key={i}
         card={card}
         onCardClick={() => handleSwitchCard(card.id)}
      />
   ));
   const menu = <Menu onStartClick={onClickStartGame} />;
   return (
      <BoardComponent>
         <Menu onStartClick={onClickStartGame} />
         <Layout>{Cards}</Layout>
      </BoardComponent>
   );
};

export default Board;
