import React from 'react';
import PropTypes from 'prop-types';
import './ShoutBox.css';

const ShoutBox = ({ title, msg, style }) => {
   return (
      <div className={`round-counter padding`} style={style}>
         <h1 className={'round-stat no-margin'}>{title}</h1>
         <p className={'no-margin'}>{msg}</p>
      </div>
   );
};

ShoutBox.propTypes = {
   title: PropTypes.string.isRequired,
   msg: PropTypes.string.isRequired,
   style: PropTypes.object.isRequired,
};

export default ShoutBox;
