import React, { useContext, useReducer } from 'react';
import rootReducer from '../reducers';
import types from '../types';

const INITIAL_STATE = {
   board: {
      cards: [],
   },
   match: {
      started: false,
      ended: false,
      round: 0,
      winner: null,
      activePlayer: 'one',
      moves: [],
      players: {
         one: { hits: [] },
         two: { hits: [] },
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
