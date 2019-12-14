import React, { useReducer } from 'react';
import rootReducer from './reducers';

const initial_state = {};

const StateContext = React.createContext(null);

const createInstance = (state = initial_state) => {
   return { context: state };
};

const Game = ({ instance = createInstance(), children }) => {
   const context = useReducer(rootReducer, instance.context);

   return (
      <StateContext.Provider value={context}>{children}</StateContext.Provider>
   );
};

export { Game, StateContext, createInstance };
