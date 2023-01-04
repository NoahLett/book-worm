import React from 'react';
import Drawer from './sidebar';
import UserIcon from './user';

export default function Header(props) {
  return (
    <header>
      <nav>
        <div className='d-flex justify-content-between align-items-center'>
          <a href="#" className='bookworm'>BookWorm</a>
          <span className='d-flex align-items-center'>
            <UserIcon/>
            <Drawer/>
          </span>
        </div>
      </nav>
    </header>
  );
}
