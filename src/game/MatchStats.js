import React, { useEffect } from 'react';
import './MatchStats.css';
import PropTypes from 'prop-types';
import { formatMillis, useTimer } from '../utils';

const MatchStats = ({ match }) => {
   const timer = useTimer();

   // stop timer when game is over and start it otherwise
   useEffect(() => {
      if (match.ended) {
         timer.stop();
      }
   }, [timer, match.ended]);

   return (
      <div className={'game-stats'}>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Started:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>
               {match.started ? formatMillis(timer.elapsed) : 'Not yet'}
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
               {match.winner ? match.winner : 'None'}
            </span>
         </div>
         {match.score.map((s, i) => {
            return (
               <React.Fragment key={i}>
                  <div className={'game-stats-item'}>
                     <span className={'game-stats-item-title'}>
                        Player {i} Pairs:
                     </span>
                  </div>
                  <div className={'game-stats-item'}>
                     <span className={'game-stats-item-stat'}>{s}</span>
                  </div>
               </React.Fragment>
            );
         })}
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-title'}>Round Moves:</span>
         </div>
         <div className={'game-stats-item'}>
            <span className={'game-stats-item-stat'}>{match.roundMoves.length}</span>
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
