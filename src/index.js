import React from 'react';
import ReactDOM from 'react-dom';
import { createInstance } from './Game';

function render(domElement) {
   const instance = createInstance();
   ReactDOM.render(instance, domElement);
}

export { render };
