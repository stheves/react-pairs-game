import React, { useEffect } from 'react';
import { useGame } from '../Game';
import operations from '../operations';

const Dealer = () => {
   const [game, dispatch] = useGame();

   // start the game on init
   useEffect(() => {
      dispatch(operations.startGame());
   }, []);


   // only logic
   return null;
};

export default Dealer;
