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
      case types.MATCH_START:
         return {
            ...state,
            match: {
               ...state.match,
               started: action.value,
            },
         };
      case types.MATCH_SET_WINNER:
         return { ...state, match: { ...state.match, winner: action.id } };
      case types.ROUND_INCREMENT_COUNT:
         return {
            ...state,
            match: { ...state.match, round: state.match.round + 1 },
         };
      case types.PLAYER_SET_ACTIVE:
         return {
            ...state,
            match: {
               ...state.match,
               players: { ...state.match.players, active: action.id },
            },
         };
      case types.PLAYER_INCREMENT_COUNT:
         return {
            ...state,
            match: {
               ...state.match,
               players: {
                  ...state.match.players,
                  [action.id]: {
                     actionCount:
                        state.match.players[action.id].actionCount + 1,
                  },
               },
            },
         };
      case types.BOARD_SET_CARDS: {
         return {
            ...state,
            board: { cards: action.cards },
         };
      }
      default:
         return state;
   }
}

export default rootReducer;
