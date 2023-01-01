import React from 'react';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({ isClicked: true });
  }

  closeMenu() {
    this.setState({ isClicked: false });
  }

  render() {
    if (!this.state.isClicked) {
      return (
        <div className='drawer d-flex align-items-center'>
          <i onClick={this.openMenu} className="fa-sharp fa-solid fa-bars"/>
          <div className='sidebar inactive'>
            <ul>
              <li className='menu-item'><a onClick={this.closeMenu} className='menu-link' href="#">Home</a></li>
              <li className='menu-item'><a onClick={this.closeMenu} className='menu-link' href="#">Wanted Books</a></li>
              <li className='menu-item'><a onClick={this.closeMenu} className='menu-link' href="#">Books for Sale</a></li>
              <li className='menu-item'><a onClick={this.closeMenu} className='menu-link' href="#">Create a Post</a></li>
              <li className='menu-item'><a onClick={this.closeMenu} className='menu-link' href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className='drawer d-flex align-items-center'>
          <i onClick={this.openMenu} className="fa-sharp fa-solid fa-bars" />
          <div className='sidebar active'>
            <ul className='px-0'>
              <li className='menu-item'>
                <button type='button' onClick={this.closeMenu} className='btn-close position-absolute top-0 end-0 p-4' aria-label='Close' />
              </li>
              <li className='menu-item py-2'>
                <i className="fa-solid fa-house me-3" />
                <a onClick={this.closeMenu} className='menu-link' href="#">Home</a>
              </li>
              <li className='menu-item py-2'>
                <i className="fa-solid fa-arrow-trend-up me-3 fw-bolder" />
                <a onClick={this.closeMenu} className='menu-link' href="#">Wanted Books</a>
              </li>
              <li className='menu-item py-2'>
                <i className="fa-solid fa-tag me-3" />
                <a onClick={this.closeMenu} className='menu-link' href="#">Books for Sale</a>
              </li>
              <li className='menu-item py-2'>
                <i className="fa-sharp fa-solid fa-feather-pointed me-3" />
                <a onClick={this.closeMenu} className='menu-link' href="#">Create a Post</a>
              </li>
              <li className='menu-item py-2'>
                <i className="fa-solid fa-question me-3 fw-bolder" />
                <a onClick={this.closeMenu} className='menu-link' href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}
