import React from 'react';

const Menu = ({ onStartClick }) => {
   return (
      <nav className={'game-navbar'}>
         <ul className={'game-navbar-nav'}>
            <li className={'game-navbar-item'}>
               <a href={'#'} className={'game-nav-link'} onClick={onStartClick}>
                  Start
               </a>
            </li>
         </ul>
      </nav>
   );
};

export default Menu;
