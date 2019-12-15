import actions from './actions';
import types from './types';

const resetCards = () => {
   const num = 20;
   const cards = [];
   for (let i = 0; i < num; i++) {
      cards.push({ id: i, value: i, side: types.CARD_SIDE_BACK });
   }
   return actions.setCards(cards);
};

const switchCard = cardId => {
   return actions.switchCard(cardId);
};

export default {
   switchCard,
   resetCards,
   setMatchStarted: actions.setMatchStarted,
   incrementRound: actions.incrementRound,
   incrementPlayerAction: actions.incrementPlayerCount,
   setActivePlayer: actions.setActivePlayer,
   setMatchWinner: actions.setMatchWinner,
};
