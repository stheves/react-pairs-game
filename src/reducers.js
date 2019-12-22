import types from './types';

const nextPlayerId = match => {
   const current = match.activePlayer;
   const keys = Object.keys(match.players);
   const next = keys.indexOf(current) + 1;
   const nextIdx = next >= keys.length ? 0 : next;
   return keys[nextIdx];
};

function countMoves(state, playerId) {
   return state.match.moves.filter(m => m.player === playerId).length;
}

const rootReducer = (state, action) => {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST: {
         const activePlayerId = state.match.activePlayer;
         const isLastMove = countMoves(state, activePlayerId) % 2;

         const nextPlayer = isLastMove
            ? nextPlayerId(state.match)
            : activePlayerId;

         const moves = [...state.match.moves];
         moves.push({ player: activePlayerId, card: action.id });

         const round = Math.round(
            moves.length / (Object.keys(state.match.players).length * 2),
         );

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
               activePlayer: nextPlayer,
               round: round,
               moves: moves,
               players: {
                  ...state.match.players,
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
