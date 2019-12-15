import React from 'react';
import { useGame } from '../Game';
import Layout from './Layout';
import CardComponent from '../card/CardComponent';
import operations from '../operations';
import BoardComponent from './BoardComponent';
import Menu from './Menu';
import Overlay from './Overlay';

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

   return (
      <BoardComponent match={game.match}>
         <Overlay match={game.match} />
         <Menu onStartClick={onClickStartGame} />
         <Layout>{Cards}</Layout>
      </BoardComponent>
   );
};

export default Board;
