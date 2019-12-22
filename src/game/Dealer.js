import React, { useEffect, useState } from 'react';
import actions from '../actions';
import Board from '../board/Board';
import { useGame } from './Game';
import GameStats from './GameStats';

function shuffle(a) {
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
   }
   return a;
}

function useShuffle(game, dispatch) {
   useEffect(() => {
      if (!game.match.started) {
         // start the game on init
         const cards = shuffle(actions.generateCards());
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

function addMove(match, cardIds) {
   const activePlayerId = match.activePlayer;
   return { player: activePlayerId, cards: cardIds };
}

const Dealer = () => {
   const [game, dispatch] = useGame();
   const [clicks, setClicks] = useState([]);

   useShuffle(game, dispatch);

   useEffect(() => {
      if (clicks.length === 2) {
         const handle = setTimeout(() => {
            // TODO next round as an action
            const nextPlayer = nextPlayerId(game.match);
            const move = addMove(game.match, clicks);
            const nextRound = game.match.round + 1;
            clicks.forEach(id => dispatch(actions.switchCard(id)));

            setClicks([]);
         }, game.switchCardTimeout);
         return () => clearTimeout(handle);
      }
   }, [game.match, game.switchCardTimeout, clicks, dispatch]);

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
