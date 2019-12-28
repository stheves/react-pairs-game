import React, { useEffect } from 'react';
import actions from '../actions';
import { useGame } from './Game';
import { CARD_SIDE_BACK } from '../board/CardComponent';

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

function filterCardsBySide(cards, side) {
   return cards.filter(c => c.side === side);
}

function getCardById(cards, cardId) {
   return cards.find(c => c.id === cardId);
}

function nextActivePlayer(currentPlayerId) {
   return currentPlayerId === 0 ? 1 : 0;
}

const Dealer = () => {
   const [game, dispatch] = useGame();

   // runs after the match has started and shuffles the cards
   useShuffle(game, dispatch);

   // runs after user selects a card
   useEffect(() => {
      if (game.board.selectedCard) {
         dispatch(actions.switchCard([game.board.selectedCard]));
         dispatch(actions.roundUpdate(game.board.selectedCard));
      }
   }, [dispatch, game.board.selectedCard]);

   // runs after user selected both cards
   useEffect(() => {
      if (game.match.roundMoves.length === 2) {
         const [firstCard, secondCard] = game.match.roundMoves;
         const scored =
            getCardById(game.board.cards, firstCard).value ===
            getCardById(game.board.cards, secondCard).value;
         dispatch(actions.disableBoard(true));
         dispatch(actions.roundCommit(scored));
      }
   }, [dispatch, game.match.roundMoves, game.board.cards]);

   // detects when game is over
   useEffect(() => {
      if (game.match.roundCommitted) {
         const gameOver =
            filterCardsBySide(game.board.cards, CARD_SIDE_BACK).length === 0;
         if (gameOver) {
            const winner = game.match.score.indexOf(
               Math.max(...game.match.score),
            );
            dispatch(actions.endMatch(winner, new Date()));
         }
      }
   }, [
      dispatch,
      game.match.score,
      game.match.roundCommitted,
      game.board.cards,
   ]);

   // delays triggering of next round start after commit
   useEffect(() => {
      if (!game.match.roundCommitted || game.match.ended) {
         return;
      }

      const handle = setTimeout(() => {
         // switch back the cards
         if (!game.match.roundScored) {
            dispatch(actions.switchCard(game.match.roundMoves));
         }

         // start next round
         const nextActive = nextActivePlayer(game.match.activePlayer);
         dispatch(actions.roundStart(nextActive));
         dispatch(actions.selectCard(null));
         dispatch(actions.disableBoard(false));
      }, game.switchCardTimeout);

      return () => clearTimeout(handle);
   }, [
      game.match.ended,
      game.match.roundCommitted,
      game.match.roundScored,
      game.match.roundMoves,
      game.match.activePlayer,
      game.switchCardTimeout,
      dispatch,
   ]);

   // only logic
   return null;
};

export default Dealer;
