import types from './types';

const switchCard = cardId => {
   return { type: types.CARD_SWITCH_REQUEST, id: cardId };
};

export default { switchCard };
