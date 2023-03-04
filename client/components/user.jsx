import React from 'react';
import UserModal from './user-modal';

export default class UserIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  render() {
    if (this.state.show === true) {
      return (
        <div>
          <a className='user'><i className='fa-solid fa-user' /></a>
          <div>
            <UserModal onClick={this.closeModal}/>
          </div>
        </div>
      );
    } else if (this.state.show === false) {
      return (
        <div>
          <a className='user mx-3' onClick={this.openModal}><i className='fa-solid fa-user' /></a>
        </div>
      );
    }
  }
}
