import types from './types';
import { CARD_SIDE_BACK, CARD_SIDE_FRONT } from './board/CardComponent';
import { INITIAL_STATE } from './game/Game';

const nextPlayerId = match => {
   const current = match.activePlayer;
   const keys = Object.keys(match.players);
   const next = keys.indexOf(current) + 1;
   const nextIdx = next >= keys.length ? 0 : next;
   return keys[nextIdx];
};

function getMoves(state, playerId) {
   return state.match.moves.filter(m => m.player === playerId);
}

function getMovesCount(state, playerId) {
   return getMoves(state, playerId).length;
}

function computeHits(state, playerId, cardId) {
   const moves = state.match.moves;
   const lastMove = moves[moves.length - 1];
   if (lastMove) {
      const lastCard = getCard(state, lastMove.card);
      const currentCard = getCard(state, cardId);
      if (lastCard.value === currentCard.value) {
         // hit
         const hits = [...state.match.players[playerId].hits];
         hits.push([lastCard.id, currentCard.id]);
         return hits;
      }
   }

   // no change
   return state.match.players[playerId].hits;
}

function getCard(state, id) {
   return state.board.cards.find(c => c.id === id);
}

function getPlayersCount(state) {
   return Object.keys(state.match.players).length;
}

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

function computeNextRound(moves, state) {
   return Math.ceil(moves.length / (getPlayersCount(state) * 2));
}

function updateMatch(state, action) {
   const activePlayerId = state.match.activePlayer;
   const isLastMove = getMovesCount(state, activePlayerId) % 2;

   const nextPlayer = isLastMove ? nextPlayerId(state.match) : activePlayerId;

   const moves = [...state.match.moves];
   moves.push({ player: activePlayerId, card: action.id });

   const hits = computeHits(state, activePlayerId, action.id);

   const round = computeNextRound(moves, state);

   return {
      ...state.match,
      activePlayer: nextPlayer,
      round: round,
      moves: moves,
      players: {
         ...state.match.players,
         [activePlayerId]: {
            ...state.match.players[activePlayerId],
            hits: hits,
         },
      },
   };
}

function isGameOver(state) {
   return state.board.cards.filter(c => c.side === CARD_SIDE_BACK).length === 0;
}

function computeWinner(state) {
   let max = -1;
   let winner = null;
   Object.keys(state.match.players).forEach(k => {
      const hitsCount = state.match.players[k].hits.length;
      if (hitsCount > max) {
         max = hitsCount;
         winner = k;
      } else if (hitsCount === max) {
          winner = 'Draw';
      }
   });
   return winner;
}

function makeMove(state, action) {
   // no updates if match has ended
   if (state.match.ended) {
      return state;
   }

   // check if game over
   if (isGameOver(state)) {
      let winner = computeWinner(state);
      return {
         ...state,
         match: { ...state.match, ended: new Date(), winner: winner },
      };
   }

   // no change if card already uncovered
   if (getCard(state, action.id).side === CARD_SIDE_FRONT) {
      return state;
   }

   return {
      ...state,
      board: updateBoard(state, action),
      match: updateMatch(state, action),
   };
}

const rootReducer = (state, action) => {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST: {
         return makeMove(state, action);
      }
      case types.MATCH_RESET:
         return { ...INITIAL_STATE };
      case types.MATCH_START:
         return {
            ...INITIAL_STATE,
            board: { cards: action.cards },
            match: {
               ...INITIAL_STATE.match,
               started: new Date(),
            },
         };
      default:
         return state;
   }
};

export default rootReducer;
