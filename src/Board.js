import React from 'react';
import { useGameContext } from './Game';
import operations from './operations';
import BoardComponent from './BoardComponent';

const Board = () => {
   const [state, dispatch] = useGameContext();

   const handleCardSwitch = () => {
      dispatch(operations.switchCard(!state.cardSwitched));
   };

   return (
      <BoardComponent
         cardSwitched={state.cardSwitched}
         switchOnClickHandler={handleCardSwitch}
      />
   );
};

export default Board;
