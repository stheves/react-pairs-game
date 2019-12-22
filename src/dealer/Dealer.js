import { useEffect } from 'react';
import { useGame } from '../game/Game';
import actions from '../actions';

const Dealer = () => {
   const dispatch = useGame()[1];
   // start the game on init
   useEffect(() => {
      dispatch(actions.startMatch());
   }, [dispatch]);

   // only logic
   return null;
};

export default Dealer;
