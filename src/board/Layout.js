import React from 'react';
import './Layout.css';
import PropTypes from 'prop-types';

const Layout = ({ children = [] }) => {
   return (
      <div className={'game-wrapper'}>
         <div className={'game-board'}>
            {children.map((Child, i) => {
               return (
                  <div className={'game-board-item'} key={i}>
                     {Child}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

Layout.propTypes = {
   children: PropTypes.array,
};

export default Layout;
