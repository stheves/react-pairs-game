import React from 'react';
import { useGame } from '../Game';
import Layout from './Layout';
import CardComponent from '../card/CardComponent';
import operations from '../operations';
import BoardComponent from './BoardComponent';
import Menu from './Menu';
import GameStats from './GameStats';

const Board = () => {
   const [game, dispatch] = useGame();

   const handleSwitchCard = cardId => {
      dispatch(operations.switchCard(cardId));
   };

   const onClickStartGame = () => {
      dispatch(operations.resetCards());
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
         <Menu onStartClick={onClickStartGame} />
          <GameStats match={game.match} />
          <Layout>{Cards}</Layout>
      </BoardComponent>
   );
};

export default Board;
