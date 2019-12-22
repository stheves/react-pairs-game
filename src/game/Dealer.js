import React, { useEffect, useState } from 'react';
import actions from '../actions';
import Board from '../board/Board';
import { useGame } from './Game';
import GameStats from './GameStats';

function useStartMatchDetection(game, dispatch) {
   useEffect(() => {
      if (!game.match.started) {
         // start the game on init
         const cards = actions.generateCards();
         dispatch(actions.startMatch(cards));
      }
   }, [game.match.started, dispatch]);
}

const nextPlayerId = match => {
   const current = match.activePlayer;
   const keys = Object.keys(match.players);
   const next = keys.indexOf(current) + 1;
   const nextIdx = next >= keys.length ? 0 : next;
   return keys[nextIdx];
};

function addMove(state, cardIds) {
   const activePlayerId = state.match.activePlayer;
   return { player: activePlayerId, cards: cardIds };
}

const Dealer = () => {
   const [game, dispatch] = useGame();
   const [clicks, setClicks] = useState([]);

   useStartMatchDetection(game, dispatch);

   useEffect(() => {
      if (clicks.length === 2) {
         const handle = setTimeout(() => {
            clicks.forEach(id => dispatch(actions.switchCard(id)));
            setClicks([]);
         }, game.switchCardTimeout);
         return () => clearTimeout(handle);
      }
   }, [game.switchCardTimeout, clicks, dispatch]);

   function handleClickCard(cardId) {
      if (clicks.length >= 2) {
         return;
      }
      setClicks([...clicks, cardId]);
      dispatch(actions.switchCard(cardId));
   }

   if (!game.match.started) {
      return null;
   }

   return (
      <React.Fragment>
         <GameStats match={game.match} />
         <Board onClickCard={handleClickCard} game={game} />
      </React.Fragment>
   );
};

export default Dealer;
