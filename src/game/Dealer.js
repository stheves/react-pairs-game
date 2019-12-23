import React, { useEffect, useState } from 'react';
import actions from '../actions';
import Board from '../board/Board';
import { useGame } from './Game';
import MatchStats from './MatchStats';

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
   let count = 0;
   const players = state.match.players;
   Object.keys(players).forEach(k => {
      count = count + players[k].hits.length;
   });
   return count + 1 === state.board.cards.length / 2;
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

function createMove(match, cardIds) {
   const activePlayerId = match.activePlayer;
   return { player: activePlayerId, cards: cardIds };
}

const Dealer = () => {
   const [game, dispatch] = useGame();
   const [selectedCards, setSelectedCards] = useState([]);

   useShuffle(game, dispatch);

   useEffect(() => {
      function moveCards() {
         const nextPlayer = nextPlayerId(game.match);
         const move = createMove(game.match, selectedCards);
         const movesCount = game.match.moves.length;
         const playersCount = Object.keys(game.match.players).length;
         const nextRound = Math.floor((movesCount + 1) / playersCount) + 1;
         const firstCard = getCard(game.board.cards, selectedCards[0]);
         const secondCard = getCard(game.board.cards, selectedCards[1]);
         const hasHit = Object.is(firstCard.value, secondCard.value);
         const hit = hasHit ? [...selectedCards] : null;

         return actions.makeMove(move, nextPlayer, nextRound, hit);
      }

      if (selectedCards.length === 2) {
         const handle = setTimeout(() => {
            const mv = moveCards();
            dispatch(mv);

            if (!mv.hit) dispatch(actions.switchCard(selectedCards));

            const gameOver = isGameOver(game);
            if (gameOver) {
               dispatch(actions.endMatch(computeWinner(game), new Date()));
            }

            // reset state
            setSelectedCards([]);
         }, game.switchCardTimeout);
         return () => clearTimeout(handle);
      }
   }, [game, selectedCards, dispatch]);

   function handleClickCard(cardId) {
      if (game.ended || selectedCards.length >= 2) {
         return;
      }
      setSelectedCards([...selectedCards, cardId]);
      dispatch(actions.switchCard([cardId]));
   }

   if (!game.match.started) {
      return null;
   }

   const style =
      Object.keys(game.match.players).indexOf(game.match.activePlayer) % 2 === 0
         ? 'red'
         : 'blue';

   return (
      <React.Fragment>
         <MatchStats match={game.match} activeStyle={style} />
         <Board onClickCard={handleClickCard} board={game.board} />
      </React.Fragment>
   );
};

export default Dealer;
