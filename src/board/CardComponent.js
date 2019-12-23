import React from 'react';
import './CardComponent.css';
import PropTypes from 'prop-types';

export const CARD_SIDE_BACK = 'CARD_SIDE_BACK';
export const CARD_SIDE_FRONT = 'CARD_SIDE_FRONT';

const CardComponent = ({ card, onCardClick }) => {
   const value = card.side === CARD_SIDE_FRONT ? card.value : '?';
    const style = card.side === CARD_SIDE_FRONT ? 'front' : 'back';
   return (
      <div className={'game-card ' + style} onClick={onCardClick}>
         <span className={`game-card-value`}>{value}</span>
      </div>
   );
};

CardComponent.propTypes = {
   card: PropTypes.object,
   onCardClick: PropTypes.func,
};

// noinspection JSUnusedGlobalSymbols
CardComponent.defaultProps = {
   card: {},
   onCardClick: () => {},
};

export default CardComponent;
