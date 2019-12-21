import types from './types';

const nextActivePlayer = match => {
   const current = match.active;
   // if(match.players[current])
   const keys = Object.keys(match.players);
   const next = keys.indexOf(current) + 1;
   const nextIdx = next >= keys.length ? 0 : next;
   return keys[nextIdx];
};

const computeNextRound = match => {
   return match.players[match.active].actionCount > 0
      ? match.round + 1
      : match.round;
};

const rootReducer = (state, action) => {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST: {
         const nextActive = nextActivePlayer(state.match);
         const nextRound = computeNextRound(state.match);
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
               active: nextActive,
               round: nextRound,
               players: {
                  ...state.match.players,
                  [state.match.active]: {
                     actionCount:
                        state.match.players[state.match.active].actionCount + 1,
                  },
               },
            },
         };
      }
      case types.MATCH_START:
         return {
            ...state,
            board: { cards: action.cards },
            match: {
               ...state.match,
               round: 1,
               active: Object.keys(state.match.players)[0],
               started: true,
            },
         };
      default:
         return state;
   }
};

export default rootReducer;
