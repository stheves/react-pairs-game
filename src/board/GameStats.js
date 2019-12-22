import React from 'react';
import './GameStats.css';

const GameStats = ({ match }) => {
   return (
      <div className={'overlay'}>
         <div className={'overlay-item'}>
            <span className={'overlay-item-title'}>Started:</span>
            <span className={'overlay-item-stat'}>
               {match.started ? 'Yes' : 'Not yet'}
            </span>
         </div>
         <div className={'overlay-item'}>
            <span className={'overlay-item-title'}>Active Player:</span>
            <span className={'overlay-item-stat'}>{match.activePlayer}</span>
         </div>
         <div className={'overlay-item'}>
            <span className={'overlay-item-title'}>Winner:</span>
            <span className={'overlay-item-stat'}>
               {match.winner ? match.winner : 'None'}
            </span>
         </div>
         <div className={'overlay-item'}>
            <span className={'overlay-item-title'}>Round:</span>
            <span className={'overlay-item-stat'}>{match.round}</span>
         </div>
      </div>
   );
};

export default GameStats;
