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
      password: '',
      confirmPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.changeAndValid = this.changeAndValid.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  validatePassword() {
    if (this.state.password !== this.state.confirmPassword) {
      return 'invalid';
    } else if (this.state.password === '') {
      return '';
    } else {
      return 'valid';
    }
  }

  changeAndValid(event) {
    this.handleChange(event);
    this.validatePassword();
  }

  render() {
    const check = this.validatePassword();
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <h1 className='text-center my-5 w-50'><strong>Welcome to BookWorm!</strong></h1>
        </div>
        <h3 className='text-center'><strong>{'Let\'s get you signed up.'}</strong></h3>
        <div className='d-flex justify-content-center mt-4'>
          <div className='form-container d-flex justify-content-center py-3'>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
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
                <label htmlFor="lastName" className="form-label mt-2">Last Name</label>
                <input
            required
            id="lastName"
            type="text"
            name="lastName"
            onChange={this.handleChange}
            className="form-control" />
              </div>
              <div className='input-group d-flex justify-content-between'>
                <div>
                  <label htmlFor="city" className="form-label mt-2">City</label>
                  <input
                required
                id="city"
                type="text"
                name="city"
                onChange={this.handleChange}
                className="form-control" />
                </div>
                <div>
                  <label htmlFor="state" className='form-label mt-2'>State</label>
                  <select
                required
                name="state"
                id="state"
                className='form-control'>
                    <option selected>Choose...</option>
                    <option>AL</option>
                    <option>AK</option>
                    <option>AZ</option>
                    <option>AR</option>
                    <option>CA</option>
                    <option>CO</option>
                    <option>CT</option>
                    <option>DE</option>
                    <option>FL</option>
                    <option>GA</option>
                    <option>HI</option>
                    <option>ID</option>
                    <option>IL</option>
                    <option>IN</option>
                    <option>IA</option>
                    <option>KS</option>
                    <option>KY</option>
                    <option>LA</option>
                    <option>ME</option>
                    <option>MD</option>
                    <option>MA</option>
                    <option>MI</option>
                    <option>MN</option>
                    <option>MS</option>
                    <option>MO</option>
                    <option>MT</option>
                    <option>NE</option>
                    <option>NV</option>
                    <option>NH</option>
                    <option>NJ</option>
                    <option>NM</option>
                    <option>NY</option>
                    <option>NC</option>
                    <option>ND</option>
                    <option>OH</option>
                    <option>OK</option>
                    <option>OR</option>
                    <option>PA</option>
                    <option>RI</option>
                    <option>SC</option>
                    <option>SD</option>
                    <option>TN</option>
                    <option>TX</option>
                    <option>UT</option>
                    <option>VT</option>
                    <option>VA</option>
                    <option>WA</option>
                    <option>WV</option>
                    <option>WI</option>
                    <option>WY</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="username" className="form-label mt-2">Username</label>
                <input
            required
            id="username"
            type="text"
            name="username"
            onChange={this.handleChange}
            className="form-control" />
              </div>
              <div>
                <label htmlFor="password" className="form-label mt-2">Password</label>
                <input
            required
            id="password"
            type="password"
            name="password"
            onChange={this.changeAndValid}
            className="form-control" />
              </div>
              <div>
                <label htmlFor="confirm-password" className='form-label mt-2'>Confirm Password</label>
                <input
            required
            id='confirm-password'
            type="password"
            name='confirmPassword'
            onChange={this.changeAndValid}
            className={`form-control ${check}`} />
              </div>
              <div className='d-flex justify-content-end'>
                <button type="submit" className='btn btn-outline-info mt-2'>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
