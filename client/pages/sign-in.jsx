import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  formContainer: {
    backgroundColor: '#f1f3f5',
    width: '30rem',
    border: '1px solid lightgray',
    borderRadius: '10px'
  }
};

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
          window.location.hash = '#';
        }
      });
  }

  render() {
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <h1 className='text-center my-5'><strong>Welcome Back!</strong></h1>
        </div>
        <h3 className='text-center'><strong>Please sign in to gain access to user features.</strong></h3>
        <div className='d-flex justify-content-center'>
          <div className='d-flex justify-content-center mx-1 mt-4 py-3' style={styles.formContainer}>
            <form className='w-75' onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="username" className='form-label mt-2'>Username</label>
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
                <label htmlFor="password" className='form-label mt-2'>Password</label>
                <input
              required
              id="password"
              name='password'
              type="password"
              onChange={this.handleChange}
              className="form-control" />
              </div>
              <div className='d-flex justify-content-end'>
                <button type='submit' className='btn btn-outline-info mt-3'>Sign In</button>
              </div>
              <div>
                <p className='text-center pt-4'>Not a user? Click <a href='#sign-up' className='text-info text-decoration-none'>here</a> to sign up!</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Authentication.contextType = AppContext;
