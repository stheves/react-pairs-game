import types from './types';
import { CARD_SIDE_BACK, CARD_SIDE_FRONT } from './board/CardComponent';

function updateBoard(state, action) {
   return {
      cards: state.board.cards.map(card => {
         if (card.id === action.id) {
            const side =
               card.side === CARD_SIDE_FRONT ? CARD_SIDE_BACK : CARD_SIDE_FRONT;
            return { ...card, side: side };
         } else {
            return card;
         }
      }),
   };
}

function startMatch(state, action) {
   return {
      ...state,
      board: { cards: action.cards },
      match: {
         ...state.match,
         started: new Date(),
      },
   };
}

function switchCard(state, action) {
   return { ...state, board: updateBoard(state, action) };
}

function updateHit(state, action) {
   if (action.hit) {
      return {
         ...state.match.players,
         [action.move.player]: {
            hits: [...state.match.players[action.move.player].hits, action.hit],
         },
      };
   } else {
      return state.match.players;
   }
}

const rootReducer = (state, action) => {
   switch (action.type) {
      case types.SWITCH_CARD:
         return switchCard(state, action);
      case types.MAKE_MOVE:
         return {
            ...state,
            match: {
               ...state.match,
               moves: [...state.match.moves, action.move],
               activePlayer: action.nextPlayer,
               round: action.nextRound,
               players: updateHit(state, action),
            },
         };
      case types.MATCH_START:
         return startMatch(state, action);
      case types.RESET_GAME:
         return { ...action.initialState };
      case types.MATCH_END:
         return {
            ...state,
            match: {
               ...state.match,
               ended: action.endedAt,
               winner: action.winner,
            },
         };
      default:
         return state;
   }
};

export default rootReducer;
