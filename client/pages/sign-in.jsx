import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.context.handleSignIn(result);
        }
        if (result.user) return <Redirect to=""/>;
      });
  }

  render() {
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <h1 className='text-center my-5 w-50'><strong>Welcome Back!</strong></h1>
        </div>
        <h3 className='text-center'><strong>Please sign in to gain access to user features.</strong></h3>
        <div className='form-container d-flex justify-content-center mt-4 py-3'>
          <form className='sign-in-form' onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="username" className='form-label'>Username</label>
              <input
                required
                autoFocus
                id='username'
                name='username'
                type="text"
                onChange={this.handleChange}
                className="form-control" />
            </div>
            <div>
              <label htmlFor="password" className='form-label'>Password</label>
              <input
              required
              id="password"
              name='password'
              type="password"
              onChange={this.handleChange}
              className="form-control" />
            </div>
            <div>
              <button type='submit' className='btn btn-outline-info mt-2'>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Authentication.contextType = AppContext;
