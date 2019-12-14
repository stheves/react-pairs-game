import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ReactPairsGame } from './react-pairs-game';

function render(domElement) {
   ReactDOM.render(
      <ReactPairsGame deckSize={16} deckTheme={'Marvel'} />,
      domElement,
   );
}

export { render };
