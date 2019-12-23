import React from 'react';
import PropTypes from 'prop-types';
import './RoundCounter.css';

const RoundCounter = ({ round, activePlayer, bgClass }) => {
   return (
      <div className={`round-counter ${bgClass}`}>
          <div className={'round-stat'}>Round: {round}</div>
         <div className={'round-stat'}>Player: {activePlayer}</div>
      </div>
   );
};

RoundCounter.propTypes = {
   round: PropTypes.object.isRequired,
   activePlayer: PropTypes.object.isRequired,
   bgClass: PropTypes.object.isRequired,
};

export default RoundCounter;
