import React from 'react';
import Drawer from './sidebar';

export default function Header(props) {
  return (
    <header>
      <nav>
        <div className='d-flex justify-content-between align-items-center'>
          <a href="#" className='bookworm'>BookWorm</a>
          <span className='d-flex align-items-center'>
            <a href="#sign-up" className='user me-4'>
              <i className="fa-solid fa-user" />
            </a>
            <Drawer/>
          </span>
        </div>
      </nav>
    </header>
  );
}
