import React, { useEffect, useState } from 'react';
import actions from '../actions';
import Board from '../board/Board';
import { useGame } from './Game';
import GameStats from './GameStats';
import { CARD_SIDE_BACK } from '../board/CardComponent';

function shuffle(a) {
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
   }
   return a;
}

function computeWinner(state) {
   let max = -1;
   let winner = null;
   Object.keys(state.match.players).forEach(k => {
      const hitsCount = state.match.players[k].hits.length;
      if (hitsCount > max) {
         max = hitsCount;
         winner = k;
      } else if (hitsCount === max) {
         winner = 'Draw';
      }
   });
   return winner;
}

function isGameOver(state) {
   return state.board.cards.filter(c => c.side === CARD_SIDE_BACK).length === 0;
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

function getCard(cards, id) {
   return cards.find(c => c.id === id);
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
   const [selectedCards, setSelectedCards] = useState([]);

   useShuffle(game, dispatch);

   useEffect(() => {
      if (selectedCards.length === 2) {
         const handle = setTimeout(() => {
            // TODO split this up in multiple useEffect hooks
            // end game
            const gameOver = isGameOver(game);
            if (gameOver) {
               dispatch(actions.endGame(computeWinner(game), new Date()));
               setSelectedCards([]);
               return;
            }

            // make move
            const nextPlayer = nextPlayerId(game.match);
            const move = addMove(game.match, selectedCards);
            const nextRound = game.match.round + 1;
            const isHit =
               getCard(game.board.cards, selectedCards[0]).value ===
               getCard(game.board.cards, selectedCards[1]).value;
            const hit = isHit ? [...selectedCards] : null;
            dispatch(actions.makeMove(move, nextPlayer, nextRound, hit));
            !isHit &&
               selectedCards.forEach(id => dispatch(actions.switchCard(id)));

            setSelectedCards([]);
         }, game.switchCardTimeout);
         return () => clearTimeout(handle);
      }
   }, [game, selectedCards, dispatch]);

   function handleClickCard(cardId) {
      if (selectedCards.length >= 2) {
         return;
      }
      setSelectedCards([...selectedCards, cardId]);
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
