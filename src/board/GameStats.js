import React from 'react';
import './GameStats.css';

const GameStats = ({ match }) => {
   return (
      <div className={'overlay'}>
         <div className={'overlay-item'}>
            Started: {match.started ? 'Yes' : 'Not yet'}
         </div>
         <div className={'overlay-item'}>Active Player: {match.active}</div>
         <div className={'overlay-item'}>
            Winner: {match.winner ? match.winner : 'None'}
         </div>
         <div className={'overlay-item'}>Round: {match.round}</div>
      </div>
   );
};

export default GameStats;
