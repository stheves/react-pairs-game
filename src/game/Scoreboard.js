import React from 'react';
import PropTypes from 'prop-types';
import './Scoreboard.css';

const Scoreboard = ({ title, msg, style }) => {
   return (
      <div className={`round-counter padding`} style={style}>
         <h1 className={'round-stat no-margin'}>{title}</h1>
         <p className={'no-margin'}>{msg}</p>
      </div>
   );
};

Scoreboard.propTypes = {
   title: PropTypes.string.isRequired,
   msg: PropTypes.string.isRequired,
   style: PropTypes.object.isRequired,
};

export default Scoreboard;
