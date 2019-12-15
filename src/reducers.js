import types from './types';

function cardReducer(state, action) {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST:
         return {
            ...state,
            board: {
               cards: state.board.cards.map(card => {
                  if (card.id === action.id) {
                     const side =
                        card.side === types.CARD_SIDE_FRONT
                           ? types.CARD_SIDE_BACK
                           : types.CARD_SIDE_FRONT;
                     return { ...card, side: side };
                  } else {
                     return card;
                  }
               }),
            },
         };

      default:
         return state;
   }
}

export default cardReducer;
