import React from 'react';
import './BoardComponent.css';

const BoardComponent = ({cardSwitched, switchOnClickHandler}) => {
  return (
      <div className={'game-board'}>
          <p>Card switched: {cardSwitched ? 'Yes' : 'No'}</p>
          <button onClick={switchOnClickHandler}>Switch</button>
      </div>
  );
};

export default BoardComponent;
