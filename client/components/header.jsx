import React from 'react';

export default function Header(props) {
  return (
    <header>
      <nav>
        <div className='d-flex row align-items-center'>
          <div className='d-flex justify-content-between align-items-center'>
            <a href="#" className='bookworm'>BookWorm</a>
            <span className='d-flex align-items-center'>
              <a href="#" className='user mx-3'>
                <i className="fa-solid fa-user" />
              </a>
              <a href="#" className='menu mx-3'>
                <i className="fa-solid fa-bars" />
              </a>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
