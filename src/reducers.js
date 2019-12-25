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
         roundStarted: true,
      },
   };
}

function switchCard(state, action) {
   return { ...state, board: updateBoard(state, action) };
}

function roundStart(state, action) {
   return {
      ...state,
      match: {
         ...state.match,
         roundStarted: true,
         roundCommitted: false,
         roundMoves: [],
         roundScored: false,
         activePlayer: action.activePlayer,
      },
   };
}

function roundUpdate(state, action) {
   return {
      ...state,
      match: {
         ...state.match,
         roundMoves: [...state.match.roundMoves, action.movedCardId],
      },
   };
}

function roundCommit(action, state) {
   const score = action.scored
      ? state.match.score[state.match.activePlayer] + 1
      : state.match.score[state.match.activePlayer];
   const newScore = [...state.match.score];
   newScore[state.match.activePlayer] = score;
   return {
      ...state,
      match: {
         ...state.match,
         score: newScore,
         roundCommitted: true,
         roundScored: action.scored,
      },
   };
}

function selectCard(state, action) {
   return {
      ...state,
      board: { ...state.board, selectedCard: action.id },
   };
}

function disableBoard(state, action) {
   return {
      ...state,
      board: {
         ...state.board,
         disabled: action.disable,
      },
   };
}

function matchEnd(state, action) {
   return {
      ...state,
      match: {
         ...state.match,
         endDate: action.endedAt,
         ended: true,
         winner: action.winner,
      },
   };
}

const rootReducer = (state, action) => {
   switch (action.type) {
      case types.ROUND_START:
         return roundStart(state, action);
      case types.ROUND_UPDATE:
         return roundUpdate(state, action);
      case types.ROUND_COMMIT:
         return roundCommit(action, state);
      case types.SWITCH_CARD:
         return switchCard(state, action);
      case types.SELECT_CARD:
         return selectCard(state, action);
      case types.DISABLE_BOARD:
         return disableBoard(state, action);
      case types.MATCH_START:
         return startMatch(state, action);
      case types.MATCH_END:
         return matchEnd(state, action);
      case types.RESET_GAME:
         return { ...action.initialState };
      default:
         return state;
   }
};

export default rootReducer;
