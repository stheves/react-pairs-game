import React from 'react';
import './Layout.css';
import PropTypes from 'prop-types';

const Layout = ({ children = [] }) => {
   return (
      <div className={'game-board-wrapper'}>
         <div className={'game-board'}>
            {children.map((item, i) => {
               return (
                  <div className={'game-board-item'} key={i}>
                     {item}
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
