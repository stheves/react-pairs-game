import React, { useEffect, useState } from 'react';
import { useGame } from '../game/Game';
import Layout from './Layout';
import CardComponent from './CardComponent';
import actions from '../actions';
import BoardComponent from './BoardComponent';
import Menu from './Menu';
import GameStats from './GameStats';

const Board = () => {
   const [game, dispatch] = useGame();
   const [clicks, setClicks] = useState([]);

   useEffect(() => {
      if (clicks.length === 1) {
         const clear = setTimeout(() => {
            for (let id in clicks) {
               dispatch(actions.makeMove(id));
            }
         }, 3000);
         return () => clearTimeout(clear);
      }
   }, [clicks, dispatch]);

   const handleClickCard = cardId => {
      if (clicks.length < 2) {
         setClicks([...clicks, cardId]);
         dispatch(actions.chooseCard(cardId));
      } else {
         setClicks([]);
      }
   };

   const onClickStartGame = () => {
      dispatch(actions.startMatch());
   };

   const Cards = game.board.cards.map((card, i) => (
      <CardComponent
         key={i}
         card={card}
         onCardClick={() => handleClickCard(card.id)}
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
