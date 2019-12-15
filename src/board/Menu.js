import React from 'react';
import { useGame } from '../Game';
import operations from '../operations';

const Menu = () => {
   const [game, dispatch] = useGame();

   const onClickStartGame = () => {
      dispatch(operations.startGame(dispatch));
   };

   return (
      <nav className={'game-navbar'}>
         <ul className={'game-navbar-nav'}>
            <li className={'game-navbar-item'}>
               <a
                  href={'#'}
                  className={'game-nav-link'}
                  onClick={onClickStartGame}
               >
                  Start
               </a>
            </li>
         </ul>
      </nav>
   );
};

export default Menu;
