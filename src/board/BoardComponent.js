import React from 'react';
import './BoardComponent.css';
import CardComponent from '../card/CardComponent';

const BoardComponent = ({ cards = [] }) => {
   const Cards = cards.map((card, i) => <CardComponent key={i} card={card} />);
   return (
      <div className={'game-board'}>
         <h1>Board</h1>
          {Cards}
      </div>
   );
};

export default BoardComponent;
