import React, { useContext, useReducer } from 'react';
import rootReducer from '../reducers';
import PropTypes from 'prop-types';
import GameContainer from './GameContainer';

const INITIAL_STATE = {
   switchCardTimeout: 3000,
   board: {
      disabled: false,
      cards: [],
      highlighted: [],
      selectedCard: null,
   },
   playerColor: ['darkred', 'darkblue'],
   match: {
      started: false,
      startDate: null,
      endDate: null,
      ended: false,
      round: 1,
      roundStarted: false,
      roundCommitted: false,
      roundMoves: [],
      roundScored: false,
      winner: null,
      activePlayer: 0,
      score: [0, 0],
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
