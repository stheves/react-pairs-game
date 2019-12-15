import React, { useContext, useReducer } from 'react';
import rootReducer from './reducers';
import types from './types';

const INITIAL_STATE = {
   board: {
      cards: [
         {
            id: 1,
            value: 1,
            side: types.CARD_SIDE_BACK,
         },
         {
            id: 2,
            value: 1,
            side: types.CARD_SIDE_BACK,
         },
      ],
   },
   match: {
      started: false,
      players: {
         active: 'one',
         one: { actionCount: 0 },
         two: { actionCount: 0 },
      },
   },
};

const GameState = React.createContext(null);

const useGame = () => {
   return useContext(GameState);
};

const Game = ({ instance = createInstance(), children }) => {
   return (
      <GameState.Provider value={instance.context}>
         {children}
      </GameState.Provider>
   );
};

const createInstance = (state = INITIAL_STATE) => {
   const context = useReducer(rootReducer, state);
   return { context: context };
};

export { Game, useGame };
