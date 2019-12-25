import types from './types';
import { CARD_SIDE_BACK } from './board/CardComponent';

const makeMove = (move, nextPlayer, nextRound, hit) => {
   return {
      type: types.MAKE_MOVE,
      move: move,
      nextPlayer: nextPlayer,
      nextRound: nextRound,
      hit: hit,
   };
};

const generateCards = () => {
   const num = 20;
   const cards = [];
   for (let i = 0; i < num; i++) {
      cards.push({ id: String(i), value: i % (num / 2), side: CARD_SIDE_BACK });
   }
   return cards;
};

const startMatch = (cards = generateCards()) => {
   return { type: types.MATCH_START, cards: cards };
};

const endMatch = (winner, endedAt) => {
   return { type: types.MATCH_END, winner: winner, endedAt: endedAt };
};

const switchCard = (cardIds = []) => {
   return { type: types.SWITCH_CARD, ids: cardIds };
};

const resetGame = initState => {
   return { type: types.RESET_GAME, initialState: initState };
};

const disableBoard = disable => {
   return { type: types.DISABLE_BOARD, disable: disable };
};

const selectCard = cardId => {
   return { type: types.SELECT_CARD, id: cardId };
};

const roundStart = activePlayer => {
   return { type: types.ROUND_START, activePlayer: activePlayer };
};

const roundCommit = (moves, hit) => {
   return { type: types.ROUND_COMMIT, moves: moves, hit: hit };
};

export default {
   roundCommit,
   roundStart,
   selectCard,
   disableBoard,
   generateCards,
   switchCard,
   makeMove,
   startMatch,
   resetGame,
   endMatch,
};
