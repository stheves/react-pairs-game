import React from 'react';
import PropTypes from 'prop-types';
import './ShoutBox.css';

const ShoutBox = ({ title, msg, bgClass }) => {
   return (
      <div className={`round-counter padding ${bgClass}`}>
         <h1 className={'round-stat no-margin'}>{title}</h1>
         <p className={'no-margin'}>{msg}</p>
      </div>
   );
};

ShoutBox.propTypes = {
   title: PropTypes.number.isRequired,
   msg: PropTypes.string.isRequired,
   bgClass: PropTypes.string.isRequired,
};

export default ShoutBox;
