import React from 'react';
import ReactDOM from 'react-dom';
import { createInstance, Game } from './Game';
import Board from './Board';

function render(domElement) {
   const instance = createInstance();
   ReactDOM.render(
      <Game instance={instance}>
         <Board />
      </Game>,
      domElement,
   );
}

export { render };
