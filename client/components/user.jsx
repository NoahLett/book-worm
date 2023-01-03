import React from 'react';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.checkForUser = this.checkForUser.bind(this);
  }
}
