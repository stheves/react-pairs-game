import React from 'react';

const Menu = ({ onClickStartGame }) => {
   return (
      <nav className={'game-navbar'}>
         <ul className={'game-navbar-nav'}>
            <li className={'game-navbar-item'}>
               <a
                  href={'#start'}
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
