import React from 'react';
import './Menu.css';
import PropTypes from 'prop-types';

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

Menu.propTypes = {
   onStartClick: PropTypes.func,
};

export default Menu;
