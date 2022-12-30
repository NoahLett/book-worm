import React from 'react';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            required
            autoFocus
            id="firstName"
            type="text"
            name="firstName"
            onChange={this.handleChange}
            className="form-control" />
        </div>
        <div>
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            required
            id="lastName"
            type="text"
            name="lastName"
            onChange={this.handleChange}
            className="form-control" />
        </div>
        <div>
          <label htmlFor="city" className="form-label">City</label>
          <input
            required
            id="city"
            type="text"
            name="city"
            onChange={this.handleChange}
            className="form-control" />
        </div>

      </form>
    );
  }
}
