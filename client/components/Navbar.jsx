import React, { useState, useEffect, useContext } from 'react';
import Button from './Button';
import './Navbar.css';
import './Button.css';
import AppContext from '../lib/app-context';

export default function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const { user, handleSignOut } = useContext(AppContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <a href='#' className="navbar-logo bookworm mx-1" onClick={closeMobileMenu}>
            BookWorm
          </a>
          <div className="menu-icon">
            <i onClick={handleClick} className={click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={closeMobileMenu}>
            <li className='nav-item'>
              <a href='#' className='nav-links' onClick={closeMobileMenu}>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a href='#wanted' className='nav-links' onClick={closeMobileMenu}>
                Wanted Books
              </a>
            </li>
            <li className='nav-item'>
              <a href='#for-sale' className='nav-links' onClick={closeMobileMenu}>
                Books for Sale
              </a>
            </li>
            <li className='nav-item'>
              <a href='#post-form' className='nav-links' onClick={closeMobileMenu}>
                Post
              </a>
            </li>
            <li className='nav-item'>
              <a href='#faq' className='nav-links' onClick={closeMobileMenu}>
                FAQ
              </a>
            </li>
            <li className='nav-item'>
              {user ? <button onClick={handleSignOut} className='nav-links-mobile'>Sign Out</button> : <a className='nav-links-mobile' href='#sign-up'>Sign Up</a>}
            </li>
          </ul>
          {button && user ? <button onClick={handleSignOut} className='button-outline button-medium'>Sign Out</button> : button && <a href='#sign-up'><Button buttonStyle='button-outline'>Sign Up</Button></a>}
        </div>
      </nav>
    </div>
  );
}
