import actions from './actions';
import types from './types';

const startGame = () => {
    const num = 20;
    const cards = [];
    for (let i = 0; i < num; i++) {
        cards.push({ id: i, value: i, side: types.CARD_SIDE_BACK });
    }
   return actions.setCards(cards);
};

export default { switchCard: actions.switchCard, startGame };
