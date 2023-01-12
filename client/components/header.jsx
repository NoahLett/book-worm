import React from 'react';
import Drawer from './sidebar';
import UserIcon from './user';

const styles = {
  bookworm: {
    fontSize: '3.25rem',
    textDecoration: 'none',
    fontFamily: '"Exo 2", sans-serif',
    color: '#0096c7'
  }
};

export default function Header(props) {
  return (
    <header className='bg-secondary px-3 border-bottom border-dark'>
      <nav>
        <div className='d-flex justify-content-between align-items-center'>
          <a href="#" style={styles.bookworm}><h1 className='bookworm' style={styles.bookworm}>BookWorm</h1></a>
          <span className='d-flex align-items-center'>
            <UserIcon/>
            <Drawer/>
          </span>
        </div>
      </nav>
    </header>
  );
}
