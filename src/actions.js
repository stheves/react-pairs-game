import types from './types';

// card actions
const switchCard = cardId => {
   return { type: types.CARD_SWITCH_REQUEST, id: cardId };
};

const startMatch = () => {
   const num = 20;
   const cards = [];
   for (let i = 0; i < num; i++) {
      cards.push({ id: i, value: i % (num / 2), side: types.CARD_SIDE_BACK });
   }
   return { type: types.MATCH_START, cards: cards };
};

export default {
   switchCard,
   startMatch,
};
