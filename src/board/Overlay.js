import React from 'react';
import './Overlay.css';

const Overlay = ({ match }) => {
   return (
      <div className={'overlay'}>
         <div className={'overlay-item'}>
            Started: {match.started ? 'Yes' : 'Not yet'}
         </div>
         <div className={'overlay-item'}>
            Active Player: {match.players.active}
         </div>
         <div className={'overlay-item'}>
            Winner: {match.winner} Round: {match.round}
         </div>
      </div>
   );
};

export default Overlay;
