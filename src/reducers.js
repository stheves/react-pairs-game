import types from './types';

function rootReducer(state, action) {
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
      case types.BOARD_SET_CARDS: {
          return { ...state, board: { cards: action.cards } };
      }
      default:
         return state;
   }
}

export default rootReducer;
