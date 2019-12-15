import React from 'react';
import './Layout.css';
import Menu from './Menu';

const Layout = ({ children = [] }) => {
   return (
      <div className={'game-wrapper'}>
         <Menu />
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
