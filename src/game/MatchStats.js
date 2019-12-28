import React, { useEffect } from 'react';
import './MatchStats.css';
import PropTypes from 'prop-types';
import { formatMillis, getPlayerName, useTimer } from '../utils';

const MatchStats = ({ match }) => {
   const { elapsed, stop, restart } = useTimer();

   // stop timer when game is over and start it otherwise
   useEffect(() => {
      if (match.ended) {
         stop();
      } else if (match.started) {
         restart();
      }
   }, [stop, restart, match.ended, match.started]);

   return (
      <div className={'game-stats'}>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Started:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.started ? formatMillis(elapsed) : 'Not yet'}
            </span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Ended:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.ended ? match.endDate.toLocaleTimeString() : 'Not yet'}
            </span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Winner:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.winner !== -1 ? getPlayerName(match.winner) : 'None'}
            </span>
         </div>
         {match.score.map((s, i) => {
            return (
               <React.Fragment key={i}>
                  <div className={'game-stats-item'}>
                     <span className={'game-stats-item-title'}>
                        {getPlayerName(i)} Pairs:
                     </span>
                  </div>
                  <div className={'game-stats-item'}>
                     <span className={'game-stats-item-stat'}>{s}</span>
                  </div>
               </React.Fragment>
            );
         })}
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Moves:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.roundMoves.length}/2
            </span>
         </div>
      </div>
   );
};

MatchStats.propTypes = {
   match: PropTypes.object,
};

MatchStats.defaultProps = {
   match: { players: {} },
};

export default MatchStats;
