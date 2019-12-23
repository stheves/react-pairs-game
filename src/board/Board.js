import React from 'react';
import Layout from './Layout';
import CardComponent from './CardComponent';
import PropTypes from 'prop-types';

const Board = ({ onClickCard, board }) => {
   const Cards = board.cards.map((card, i) => (
      <CardComponent
         key={i}
         card={card}
         onCardClick={() => onClickCard(card.id)}
      />
   ));

   return <Layout>{Cards}</Layout>;
};

Board.propTypes = {
   onClickCard: PropTypes.func,
   board: PropTypes.object,
};

// noinspection JSUnusedGlobalSymbols
Board.defaultProps = {
   onClickCard: () => {},
   board: { cards: [] },
};

export default Board;
