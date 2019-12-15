import React from 'react';
import './BoardComponent.css';

const BoardComponent = ({ children, match }) => {
   return (
      <div className={'board-main'}>
         <div className={'overlay'}>
            <p>Game started: {match.started ? 'Yes' : 'Not yet'}</p>
            <p>Active Player: {match.players.active}</p>
            <p>Player One: {match.players.one.actionCount}</p>
            <p>Player Tow: {match.players.two.actionCount}</p>
         </div>
         {children}
      </div>
   );
};

export default BoardComponent;
