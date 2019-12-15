import React from 'react';
import './Overlay.css';

const Overlay = ({ match }) => {
   return (
      <div className={'overlay'}>
         <p>
            Game started: {match.started ? 'Yes' : 'Not yet'}
            <br />
            Active player: {match.players.active}
            <br />
            Player one actions: {match.players.one.actionCount}
            <br />
            Player tow actions: {match.players.two.actionCount}
         </p>
      </div>
   );
};

export default Overlay;
