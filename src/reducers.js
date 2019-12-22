import types from './types';

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
   const lastCard = getCard(state, lastMove.card);
   const currentCard = getCard(state, cardId);
   if (lastCard.value === currentCard.value) {
      // hit
      const hits = [...state.match.players[playerId].hits];
      hits.push([lastCard.id, currentCard.id]);
      return hits;
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

const rootReducer = (state, action) => {
   switch (action.type) {
      case types.CARD_SWITCH_REQUEST: {
         const activePlayerId = state.match.activePlayer;
         const isLastMove = getMovesCount(state, activePlayerId) % 2;

         const nextPlayer = isLastMove
            ? nextPlayerId(state.match)
            : activePlayerId;

         const moves = [...state.match.moves];
         moves.push({ player: activePlayerId, card: action.id });

         const hits = computeHits(state, activePlayerId, action.id);

         const round = Math.round(moves.length / (getPlayersCount(state) * 2));

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
                  [activePlayerId]: {
                     ...state.match.players[activePlayerId],
                     hits: hits,
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
