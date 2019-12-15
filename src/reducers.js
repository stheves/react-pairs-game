import types from './types';

function rootReducer(state, action) {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST:
         return {
            ...state,
            // update the board
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
            // update the match
            match: {
               ...state.match,
               players: {
                  ...state.match.players,
                  [state.match.players.active]: {
                     actionCount:
                        state.match.players[state.match.players.active]
                           .actionCount + 1,
                  },
               },
            },
         };
      case types.BOARD_SET_CARDS: {
         return {
            ...state,
            board: { cards: action.cards },
            match: { ...state.match, started: true },
         };
      }
      default:
         return state;
   }
}

export default rootReducer;
