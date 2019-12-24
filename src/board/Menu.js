import React, { useEffect, useRef, useState } from 'react';
import './Menu.css';
import PropTypes from 'prop-types';

const Menu = ({ onStartClick }) => {
   const [dropdown, setDropdown] = useState(false);
   const [activeLink, setActiveLink] = useState(false);
   const menuRef = useRef(null);

   // detect click outside of menu
   useEffect(() => {
      function handleClickOutside(event) {
         // noinspection JSUnresolvedFunction
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setDropdown(false);
            setActiveLink(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   function toggleDropDown() {
      setActiveLink(!dropdown);
      setDropdown(!dropdown);
   }

   function handleStartClick() {
      setDropdown(false);
      setActiveLink(false);
      onStartClick();
   }

   return (
      <nav className={'game-navbar'}>
         <ul className={'game-navbar-nav'} ref={menuRef}>
            <li className="game-navbar-item dropdown">
               <a
                  href={'#'}
                  className={'game-nav-link ' + (activeLink ? 'active' : '')}
                  onClick={toggleDropDown}
               >
                  Start
               </a>
               <div className={'dropdown-menu ' + (dropdown ? 'visible' : '')}>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={handleStartClick}
                  >
                     New...
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
