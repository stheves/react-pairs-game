import types from './types';
import { CARD_SIDE_BACK } from './board/CardComponent';

// card actions
const switchCard = cardId => {
   return { type: types.MAKE_MOVE, id: cardId };
};

const generateCards = () => {
   const num = 20;
   const cards = [];
   for (let i = 0; i < num; i++) {
      cards.push({ id: i, value: i % (num / 2), side: CARD_SIDE_BACK });
   }
   return cards;
};

const startMatch = () => {
   const cards = generateCards();
   return { type: types.MATCH_START, cards: cards };
};

const resetMatch = () => {
   return { type: types.MATCH_RESET };
};

export default {
   switchCard,
   startMatch,
   resetMatch,
};
