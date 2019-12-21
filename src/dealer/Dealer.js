import React, { useEffect } from 'react';
import { useGame } from '../game/Game';
import actions from '../actions';
import types from '../types';

const Dealer = () => {
   const dispatch = useGame()[1];

   // start the game on init
   useEffect(() => {
      dispatch(actions.startMatch());
   }, []);

   // only logic
   return null;
};

export default Dealer;
