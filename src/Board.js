import React, { useContext } from 'react';
import { StateContext } from './Game';
import operations from './operations';
import './Board.css';

const Board = () => {
   const [ state, dispatch ] = useContext(StateContext);

   const handleCardSwitch = () => {
       dispatch(operations.switchCard(!state.cardSwitched));
   };

   return (
      <div className={'game-board'}>
         <p>Card switched: {state.cardSwitched ? 'Yes' : 'No'}</p>
         <button onClick={handleCardSwitch}>Switch</button>
      </div>
   );
};

export default Board;
