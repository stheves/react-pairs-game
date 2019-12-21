import React, { useEffect } from 'react';
import { useGame } from '../game/Game';
import operations from '../operations';

const Dealer = () => {
   const [game, dispatch] = useGame();

    console.log('game state: ', game);

   // start the game on init
   useEffect(() => {
      dispatch(operations.resetCards());
      dispatch(operations.setMatchStarted(true));
      dispatch(operations.incrementRound());
      dispatch(operations.setActivePlayer('one'));
      dispatch(operations.incrementPlayerAction('one'));
      dispatch(operations.setMatchWinner('two'));
   }, []);

   // only logic
   return null;
};

export default Dealer;
