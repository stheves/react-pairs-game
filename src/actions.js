import types from './types';

// card actions
const switchCard = cardId => {
   return { type: types.CARD_SWITCH_REQUEST, id: cardId };
};

// board actions
const setCards = cards => {
   return { type: types.BOARD_SET_CARDS, cards: cards };
};

export default { switchCard, setCards };
