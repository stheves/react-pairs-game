import React from 'react';
import './GameContainer.css';
import Menu from '../board/Menu';
import actions from '../actions';
import Dealer from './Dealer';
import PropTypes from 'prop-types';
import MatchStats from './MatchStats';
import ShoutBox from './ShoutBox';
import Board from '../board/Board';
import { getPlayerName } from '../utils';
import { useGame } from './Game';

const GameContainer = ({ initialState }) => {
   const [game, dispatch] = useGame();

    function getStyleForPlayer(playerId) {
        let color = game.playerColor[playerId] || game.playerColor[0];
        return { backgroundColor: color };
    }

   let style = getStyleForPlayer(game.match.activePlayer);

   let shoutTitle = 'Round ' + game.match.round;
   let shoutMsg = getPlayerName(game.match.activePlayer);
   if (game.match.winner) {
      shoutTitle = 'Game Over';
      shoutMsg = 'Winner ' + getPlayerName(game.match.winner);
      style = getStyleForPlayer(game.match.winner);
   }

   return (
      <div className={'game-wrapper'}>
         <Menu onStartClick={() => dispatch(actions.resetGame(initialState))} />
         <Dealer />
         <MatchStats match={game.match} />
         <ShoutBox title={shoutTitle} msg={shoutMsg} style={style} />
         <Board board={game.board} />
      </div>
   );
};

GameContainer.propTypes = {
   initialState: PropTypes.object,
};

export default GameContainer;
