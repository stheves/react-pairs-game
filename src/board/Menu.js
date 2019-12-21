import React from 'react';
import './Menu.css';

const Menu = ({ onStartClick }) => {
   return (
      <nav className={'game-navbar'}>
         <ul className={'game-navbar-nav'}>
            <li className={'game-navbar-item'}>
               <a href={'#'} className={'game-nav-link'} onClick={onStartClick}>
                  Start
               </a>
            </li>
            <li className={'game-navbar-item'}>
               <a href={'#'} className={'game-nav-link'} onClick={onStartClick}>
                  Other
               </a>
            </li>
         </ul>
      </nav>
   );
};

export default Menu;
