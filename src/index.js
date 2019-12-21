import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './game/Game';
import Dealer from './dealer/Dealer';
import Board from './board/Board';
import './index.css';

function render(domElement) {
   ReactDOM.render(
      <Game>
         <Dealer />
         <Board />
      </Game>,
      domElement,
   );
}

export { render };
