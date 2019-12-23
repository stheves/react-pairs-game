import React from 'react';
import PropTypes from 'prop-types';
import './RoundCounter.css';

const RoundCounter = ({ round, activePlayer, bgClass }) => {
   return (
      <div className={`round-counter padding ${bgClass}`}>
         <h1 className={'round-stat no-margin'}>Round {round}</h1>
         <p className={'no-margin'}>Player {activePlayer}</p>
      </div>
   );
};

RoundCounter.propTypes = {
   round: PropTypes.number.isRequired,
   activePlayer: PropTypes.string.isRequired,
   bgClass: PropTypes.string.isRequired,
};

export default RoundCounter;
