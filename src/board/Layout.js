import React from 'react';
import './Layout.css';

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

export default Layout;
