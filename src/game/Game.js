import React, { useContext, useReducer } from 'react';
import rootReducer from '../reducers';
import PropTypes from 'prop-types';

export const INITIAL_STATE = {
   board: {
      cards: [],
   },
   match: {
      started: null,
      ended: null,
      round: 1,
      winner: null,
      activePlayer: 'One',
      moves: [],
      players: {
         One: { hits: [] },
         Two: { hits: [] },
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

Game.propTypes = {
   instance: PropTypes.object,
   children: PropTypes.array,
};

export { Game, useGame };
