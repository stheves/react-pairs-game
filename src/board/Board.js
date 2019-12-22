import React from 'react';
import Layout from './Layout';
import CardComponent from './CardComponent';
import BoardComponent from './BoardComponent';
import PropTypes from 'prop-types';

const Board = ({ onClickCard, game }) => {
   const Cards = game.board.cards.map((card, i) => (
      <CardComponent
         key={i}
         card={card}
         onCardClick={() => onClickCard(card.id)}
      />
   ));

   return (
      <BoardComponent>
         <Layout>{Cards}</Layout>
      </BoardComponent>
   );
};

Board.propTypes = {
   onClickCard: PropTypes.func,
   game: PropTypes.object,
};

// noinspection JSUnusedGlobalSymbols
Board.defaultProps = {
   onClickCard: () => {},
   game: {},
};

export default Board;
