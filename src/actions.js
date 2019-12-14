import types from './types';

const switchCard = value => {
   return { type: types.CARD_SWITCH_REQUEST, value: value };
};

export default { switchCard};
