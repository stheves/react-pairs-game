import types from './types';
import { CARD_SIDE_BACK, CARD_SIDE_FRONT } from './board/CardComponent';

function updateBoard(state, action) {
   return {
      cards: state.board.cards.map(card => {
         if (action.ids.includes(card.id)) {
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
         startDate: new Date(),
         started: true,
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
      case types.ROUND_START:
         break;
      case types.ROUND_COMMIT:
         break;
      case types.SWITCH_CARD:
         return switchCard(state, action);
      case types.SELECT_CARD:
         return {
            ...state,
            board: { ...state.board, selectedCard: action.id },
         };
      case types.DISABLE_BOARD:
         return {
            ...state,
            board: {
               ...state.board,
               disabled: action.disabled,
            },
         };
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
               endDate: action.endedAt,
               ended: true,
               winner: action.winner,
            },
         };
      default:
         return state;
   }
   return state;
};

export default rootReducer;
