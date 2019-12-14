import types from './types';

function cardReducer(state, action) {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST:
         return { ...state, cardSwitched: action.value };
      default:
         return state;
   }
}

export default cardReducer;
