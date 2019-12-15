import React from 'react';
import types from '../types';
import Back from './Back';
import Front from './Front';
import './CardComponent.css';

const CardComponent = ({ card, onCardClick }) => {
   const Side =
      card.side === types.CARD_SIDE_FRONT
         ? () => <Front value={card.value} />
         : () => <Back />;
   return (
      <div className={'game-card'} onClick={onCardClick}>
         <Side />
      </div>
   );
};

export default CardComponent;
