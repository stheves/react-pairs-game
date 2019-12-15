import types from './types';

// card actions
const switchCard = cardId => {
   return { type: types.CARD_SWITCH_REQUEST, id: cardId };
};

// board actions
const setCards = cards => {
   return { type: types.BOARD_SET_CARDS, cards: cards };
};

const setMatchStarted = (value = true) => {
   return { type: types.MATCH_START, value: value };
};

const setActivePlayer = player => {
   return { type: types.PLAYER_SET_ACTIVE, id: player };
};

const setMatchWinner = playerId => {
   return { type: types.MATCH_SET_WINNER, id: playerId };
};

const incrementPlayerCount = playerId => {
   return { type: types.PLAYER_INCREMENT_COUNT, id: playerId };
};

const incrementRound = () => {
   return { type: types.ROUND_INCREMENT_COUNT };
};

export default {
   switchCard,
   setCards,
   setMatchStarted,
   setActivePlayer,
   setMatchWinner,
   incrementPlayerCount,
   incrementRound,
};
