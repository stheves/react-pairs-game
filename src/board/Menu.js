import React, { useState } from 'react';
import './Menu.css';
import PropTypes from 'prop-types';

const Menu = ({ onStartClick }) => {
   const [dropdown, setDropdown] = useState(false);

   function toggleDropDown() {
      setDropdown(!dropdown);
   }

    function handleStartClick() {
        setDropdown(false);
        onStartClick();
    }

    return (
      <nav className={'game-navbar'}>
         <ul className={'game-navbar-nav'}>
            <li className="game-navbar-item dropdown">
               <a
                  href={'#'}
                  className={'game-nav-link'}
                  onClick={toggleDropDown}
               >
                  Start
               </a>
               <div className={'dropdown-menu ' + (dropdown ? 'visible' : '')}>
                  <a className="dropdown-item" href="#" onClick={handleStartClick}>
                     New Game
                  </a>
               </div>
            </li>
         </ul>
      </nav>
   );
};

Menu.propTypes = {
   onStartClick: PropTypes.func,
};

export default Menu;
