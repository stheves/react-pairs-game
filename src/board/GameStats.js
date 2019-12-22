import React from 'react';
import './GameStats.css';
import PropTypes from 'prop-types';

const GameStats = ({ match }) => {
   return (
      <div className={'game-stats'}>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Started:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.started ? match.started.toLocaleTimeString() : 'No'}
            </span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Ended:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.ended ? match.ended.toLocaleTimeString() : 'No'}
            </span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Active Player:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>{match.activePlayer}</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Winner:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.winner ? match.winner : 'None'}
            </span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Round:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>{match.round}</span>
         </div>
         {Object.keys(match.players).length &&
            Object.keys(match.players).map(playerId => {
               return (
                  <React.Fragment key={playerId}>
                     <div className={'game-stats-item'}>
                        <span className={'game-stats-item-title'}>
                           Player {playerId} Hits:
                        </span>
                     </div>
                     <div className={'game-stats-item'}>
                        <span className={'game-stats-item-stat'}>
                           {match.players[playerId].hits.length}
                        </span>
                     </div>
                  </React.Fragment>
               );
            })}
      </div>
   );
};

GameStats.propTypes = {
   match: PropTypes.object,
};

export default GameStats;
