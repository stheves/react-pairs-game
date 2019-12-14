import React, { useContext, useReducer } from 'react';
import rootReducer from './reducers';
import Board from './board/Board';
import Dealer from './dealer/Dealer';
import PlayerComponent from './player/PlayerComponent';

const initial_state = {
   board: { cards: [{ id: 1 }] },
   deck: {},
};

const StateContext = React.createContext(null);

const useGameContext = () => {
   return useContext(StateContext);
};

const Game = ({ instance = createInstance(), children }) => {
   const context = useReducer(rootReducer, instance.context);

   return (
      <StateContext.Provider value={context}>{children}</StateContext.Provider>
   );
};

const createInstance = (state = initial_state) => {
   const instance = { context: state };
   return (
      <Game instance={instance}>
         <Dealer />
         <PlayerComponent />
         <PlayerComponent />
         <Board />
      </Game>
   );
};

export { Game, useGameContext, createInstance };
