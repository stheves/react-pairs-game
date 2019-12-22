import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './game/Game';
import './index.css';

function render(domElement) {
    ReactDOM.render(<Game/>, domElement);
}

export { render };
