import React from 'react';

export default function Header(props) {
  return (
    <header>
      <nav>
        <div className='d-flex row align-items-center'>
          <div className='d-flex justify-content-center col'>
            <a href="#" className='bookworm'>
              <i className="fa-solid fa-worm"/>BookWorm
            </a>
          </div>
          <div className='d-flex justify-content-center col'>
            <a href="#" className='user'>
              <i className="fa-solid fa-user" />
            </a>
            <a href="#" className='menu'>
              <i className="fa-solid fa-bars" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
