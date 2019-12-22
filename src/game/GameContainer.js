import React from 'react';
import './GameContainer.css';
import { useGameDispatch } from './Game';
import Menu from '../board/Menu';
import actions from '../actions';
import Dealer from './Dealer';
import PropTypes from 'prop-types';

const GameContainer = ({ initialState }) => {
   const dispatch = useGameDispatch();
   return (
      <div className={'game-wrapper'}>
         <Menu onStartClick={() => dispatch(actions.resetGame(initialState))} />
         <Dealer />
      </div>
   );
};

GameContainer.propTypes = {
   initialState: PropTypes.object,
};

export default GameContainer;
