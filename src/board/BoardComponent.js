import React from 'react';
import './BoardComponent.css';
import PropTypes from 'prop-types';

const BoardComponent = ({ children }) => {
   return <div className={'board-main'}>{children}</div>;
};

BoardComponent.propTypes = {
   children: PropTypes.node.isRequired,
};

export default BoardComponent;
