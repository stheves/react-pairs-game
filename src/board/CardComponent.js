import React from 'react';
import types from '../types';
import './CardComponent.css';

const CardComponent = ({ card, onCardClick }) => {
   const value = card.side === types.CARD_SIDE_FRONT ? card.value : '?';
   return (
      <div className={'game-card'} onClick={onCardClick}>
         <span className={`game-card-value`}>{value}</span>
      </div>
   );
};

export default CardComponent;
