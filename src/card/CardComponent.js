import React from 'react';

const CardComponent = ({ card }) => {
   return <div className={'game-card'}>Card: {card.id}</div>;
};

export default CardComponent;
