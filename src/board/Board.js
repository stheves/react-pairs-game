import React from 'react';
import { useGameContext } from '../Game';
import BoardComponent from './BoardComponent';

const Board = () => {
   const [state, dispatch] = useGameContext();

   return <BoardComponent cards={state.board.cards} />;
};

export default Board;
