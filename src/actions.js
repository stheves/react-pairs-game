import types from './types';
import { CARD_SIDE_BACK } from './board/CardComponent';

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

const roundUpdate = movedCardId => {
    return { type: types.ROUND_UPDATE, movedCardId: movedCardId };
};

const roundCommit = scored => {
   return { type: types.ROUND_COMMIT, scored: scored };
};

export default {
   roundUpdate,
   roundCommit,
   roundStart,
   selectCard,
   disableBoard,
   generateCards,
   switchCard,
   startMatch,
   resetGame,
   endMatch,
};
