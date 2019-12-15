import React from 'react';
import './Layout.css';
import Menu from './Menu';

const Layout = ({ children = [] }) => {
   return (
      <div className={'game-board'}>
         <Menu />
         {children.map((Child, i) => {
            return (
               <div className={'game-board-item'} key={i}>
                  {Child}
               </div>
            );
         })}
      </div>
   );
};

export default Layout;
