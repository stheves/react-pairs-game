import React, { useContext, useReducer } from 'react';
import rootReducer from '../reducers';
import PropTypes from 'prop-types';
import GameContainer from './GameContainer';

const INITIAL_STATE = {
   switchCardTimeout: 3000,
   board: {
      frozen: false,
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

const useGameDispatch = () => {
   return useGame()[1];
};

const Game = ({ instance = createInstance() }) => {
   const context = useReducer(rootReducer, instance.context);
   return (
      <GameState.Provider value={context}>
         <GameContainer initialState={instance.context} />
      </GameState.Provider>
   );
};

const createInstance = (state = INITIAL_STATE) => {
   return { context: state };
};

Game.propTypes = {
   instance: PropTypes.object,
};

export { Game, useGame, useGameDispatch };
