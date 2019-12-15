import React from 'react';
import './BoardComponent.css';

const BoardComponent = ({ children, match }) => {
   return <div className={'board-main'}>{children}</div>;
};

export default BoardComponent;
