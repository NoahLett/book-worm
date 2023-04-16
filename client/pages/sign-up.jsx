import React, { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

// const styles = {
//   signUp: {
//     marginTop: '4rem'
//   },
//   formContainer: {
//     backgroundColor: '#f1f3f5',
//     width: '30rem',
//     border: '1px solid lightgray',
//     borderRadius: '10px'
//   },
//   signupForm: {
//     width: '20rem'
//   }
// };

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Registration() {

  const firstNameRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [city, setCity] = useState('');
  const [cityFocus, setCityFocus] = useState(false);

  const [state, setState] = useState('');
  const [stateFocus, setStateFocus] = useState(false);

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchPwd]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/sign-up',
        JSON.stringify({ firstName, lastName, city, state, username, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setSuccess(true);
      return response;
    } catch (err) {
      if (!err.response) {
        setErrMsg('No server response');
      } else {
        setErrMsg('Username taken');
      }
    }
  };

  return (
    <div className="signup-container">
      {success
        ? (
          <div className="section">
            <h1 className="success">Success!</h1>
            <p>
              <a href="#sign-in" className='sign-in-link'>Sign In</a>
            </p>
          </div>
          )
        : (
          <div className="section">
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
            <h1 className="signup-header">Register</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="firstName" className="signup-label">
                First Name:
              </label>
              <input
                type="text"
                id='firstName'
                autoComplete='off'
                onChange={e => setFirstName(e.target.value)}
                required
                className="input-field"
                ref={firstNameRef}
                onFocus={() => setFirstNameFocus(true)}
                onBlur={setFirstNameFocus(false)}/>

              <label htmlFor="lastName" className="signup-label">
                Last Name:
              </label>
              <input
                type="text"
                id='lastName'
                autoComplete='off'
                onChange={e => setLastName(e.target.value)}
                required
                className="input-field"
                onFocus={() => setLastNameFocus(true)}
                onBlur={setLastNameFocus(false)} />

              <label htmlFor="city" className="signup-label">
                City:
              </label>
              <input
                type="text"
                id='city'
                autoComplete='off'
                onChange={e => setCity(e.target.value)}
                required
                className="input-field"
                onFocus={() => setCityFocus(true)}
                onBlur={setCityFocus(false)} />

              <label htmlFor="state" className="signup-label">
                State:
              </label>
              <select
                required
                id="state"
                onChange={e => setState(e.target.value)}
                className='input-field'
                onFocus={() => setStateFocus(true)}
                onBlur={setStateFocus(false)}>
                <option value="" defaultValue="">Choose...</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
            </form>
          </div>
          )
      }
    </div>
  );

}

// export default class Registration extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName: '',
//       lastName: '',
//       city: '',
//       state: '',
//       username: '',
//       password: '',
//       confirmPassword: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.validatePassword = this.validatePassword.bind(this);
//     this.changeAndValid = this.changeAndValid.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.stopper = this.stopper.bind(this);
//   }

//   handleChange(event) {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   }

//   validatePassword() {
//     if (this.state.password !== this.state.confirmPassword) {
//       return 'invalid';
//     } else if (this.state.password === '') {
//       return '';
//     } else {
//       return 'valid';
//     }
//   }

//   changeAndValid(event) {
//     this.handleChange(event);
//     this.validatePassword();
//   }

//   stopper() {
//     if (this.validatePassword() === 'invalid') {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const req = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(this.state)
//     };
//     fetch('/api/auth/sign-up', req)
//       .then(res => res.json())
//       .then(result => {
//         window.location.hash = '#sign-in';
//       });
//   }

//   render() {
//     const check = this.validatePassword();
//     const stop = this.stopper();
//     return (
//       <div style={styles.signUp}>
//         <div className='d-flex justify-content-center'>
//           <h1 className='text-center mt-5 w-50'><strong>Welcome to BookWorm!</strong></h1>
//         </div>
//         <h3 className='text-center mt-2 mb-5'><strong>{'Let\'s get you signed up.'}</strong></h3>
//         <div className='d-flex justify-content-center mt-4'>
//           <div className='d-flex justify-content-center mx-1 mb-1 py-3' style={styles.formContainer}>
//             <form className='sign-up-form' style={styles.signupForm} onSubmit={this.handleSubmit}>
//               <div>
//                 <label htmlFor="firstName" className="form-label">First Name</label>
//                 <input
//             required
//             autoFocus
//             id="firstName"
//             type="text"
//             name="firstName"
//             onChange={this.handleChange}
//             className="form-control" />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="form-label mt-2">Last Name</label>
//                 <input
//             required
//             id="lastName"
//             type="text"
//             name="lastName"
//             onChange={this.handleChange}
//             className="form-control" />
//               </div>
//               <div className='input-group d-flex justify-content-between'>
//                 <div>
//                   <label htmlFor="city" className="form-label mt-2">City</label>
//                   <input
//                 required
//                 id="city"
//                 type="text"
//                 name="city"
//                 onChange={this.handleChange}
//                 className="form-control" />
//                 </div>
//                 <div>
//                   <label htmlFor="state" className='form-label mt-2'>State</label>
//                   <select
//                 required
//                 name="state"
//                 id="state"
//                 onChange={this.handleChange}
//                 className='form-control'>
//                     <option value="" defaultValue="">Choose...</option>
//                     <option value="AL">AL</option>
//                     <option value="AK">AK</option>
//                     <option value="AZ">AZ</option>
//                     <option value="AR">AR</option>
//                     <option value="CA">CA</option>
//                     <option value="CO">CO</option>
//                     <option value="CT">CT</option>
//                     <option value="DE">DE</option>
//                     <option value="FL">FL</option>
//                     <option value="GA">GA</option>
//                     <option value="HI">HI</option>
//                     <option value="ID">ID</option>
//                     <option value="IL">IL</option>
//                     <option value="IN">IN</option>
//                     <option value="IA">IA</option>
//                     <option value="KS">KS</option>
//                     <option value="KY">KY</option>
//                     <option value="LA">LA</option>
//                     <option value="ME">ME</option>
//                     <option value="MD">MD</option>
//                     <option value="MA">MA</option>
//                     <option value="MI">MI</option>
//                     <option value="MN">MN</option>
//                     <option value="MS">MS</option>
//                     <option value="MO">MO</option>
//                     <option value="MT">MT</option>
//                     <option value="NE">NE</option>
//                     <option value="NV">NV</option>
//                     <option value="NH">NH</option>
//                     <option value="NJ">NJ</option>
//                     <option value="NM">NM</option>
//                     <option value="NY">NY</option>
//                     <option value="NC">NC</option>
//                     <option value="ND">ND</option>
//                     <option value="OH">OH</option>
//                     <option value="OK">OK</option>
//                     <option value="OR">OR</option>
//                     <option value="PA">PA</option>
//                     <option value="RI">RI</option>
//                     <option value="SC">SC</option>
//                     <option value="SD">SD</option>
//                     <option value="TN">TN</option>
//                     <option value="TX">TX</option>
//                     <option value="UT">UT</option>
//                     <option value="VT">VT</option>
//                     <option value="VA">VA</option>
//                     <option value="WA">WA</option>
//                     <option value="WV">WV</option>
//                     <option value="WI">WI</option>
//                     <option value="WY">WY</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="username" className="form-label mt-2">Username</label>
//                 <input
//             required
//             id="username"
//             type="text"
//             name="username"
//             onChange={this.handleChange}
//             className="form-control" />
//               </div>
//               <div>
//                 <label htmlFor="password" className="form-label mt-2">Password</label>
//                 <input
//             required
//             id="password"
//             type="password"
//             name="password"
//             onChange={this.changeAndValid}
//             className="form-control" />
//               </div>
//               <div>
//                 <label htmlFor="confirm-password" className='form-label mt-2'>Confirm Password</label>
//                 <input
//             required
//             id='confirm-password'
//             type="password"
//             name='confirmPassword'
//             onChange={this.changeAndValid}
//             className={`form-control ${check}`} />
//               </div>
//               <div className='d-flex justify-content-end'>
//                 <button type="submit" className='btn btn-outline-info mt-3' disabled={stop}>Sign Up</button>
//               </div>
//               <div>
//                 <p className='text-center pt-4'>Already a user? Click <a href='#sign-in' className='text-info text-decoration-none'>here</a> to sign in!</p>
//                 <p className='text-center'>(Or use our <a href='#sign-in' className='text-info text-decoration-none'>Demo Account!</a>)</p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
