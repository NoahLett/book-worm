import React, { useState, useEffect } from 'react';
import Button from './Button';
// import Drawer from './sidebar';
import UserIcon from './user';

// const styles = {
//   bookworm: {
//     fontSize: '3.25rem',
//     textDecoration: 'none',
//     fontFamily: '"Exo 2", sans-serif',
//     color: 'white'
//   }
// };

// export default function Navbar(props) {
//   return (
//     <header className='bg-secondary px-3 border-bottom border-dark'>
//       <nav>
//         <div className='d-flex justify-content-between align-items-center'>
//           <a href="#" style={styles.bookworm}><h1 className='bookworm' style={styles.bookworm}>BookWorm</h1></a>
//           <span className='d-flex align-items-center'>
//             <UserIcon/>
//             <Drawer/>
//           </span>
//         </div>
//       </nav>
//     </header>
//   );
// }
export default function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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
          <a to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Noah Lett
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
                Create a Post
              </a>
            </li>
            <li className='nav-item'>
              <a href='#faq' className='nav-links' onClick={closeMobileMenu}>
                FAQ
              </a>
            </li>
          </ul>
          <UserIcon/>
          {button && <a href='#sign-up'><Button buttonStyle='button-outline'>Sign Up</Button></a>}
        </div>
      </nav>
    </div>
  );
}
