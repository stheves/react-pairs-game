import React, { useEffect } from 'react';
import { useGame } from '../Game';
import operations from '../operations';

const Dealer = () => {
   const [game, dispatch] = useGame();

   useEffect(() => {
      dispatch(operations.startGame());
   }, []);

   // only logic
   return null;
};

export default Dealer;
