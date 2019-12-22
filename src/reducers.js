import types from './types';

const nextPlayer = match => {
   const current = match.active;
   const keys = Object.keys(match.players);
   const next = keys.indexOf(current) + 1;
   const nextIdx = next >= keys.length ? 0 : next;
   return keys[nextIdx];
};

const nextRound = match => {
   return match.players[match.active].moves > 0 ? match.round + 1 : match.round;
};

function getPlayer(state) {
   return state.match.players[state.match.active];
}

const rootReducer = (state, action) => {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST: {

         const activePlayerId = state.match.active;
         const hasMovesLeft = getPlayer(state).moves > 0;
         const isLastMove = getPlayer(state).moves === 1;
         const nextActive = isLastMove
            ? nextPlayer(state.match)
            : activePlayerId;
         const moves = isLastMove ? 2 : getPlayer(state).moves - 1;
         const round = nextRound(state.match);

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
               round: round,
               players: {
                  ...state.match.players,
                  [state.match.active]: {
                     moves: moves,
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
