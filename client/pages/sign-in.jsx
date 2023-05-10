import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/authSlice';

const SignIn = () => {

  const isLoggedIn = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(signIn(username, password));
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <div className="signin-container">
      { isLoggedIn
        ? (
          <div className="success-container">
            <h1 className="success-header">Welcome back, {username}</h1>
            <p>
              <a href="#post-form">Make a Post</a>
            </p>
          </div>
          )
        : (
          <div className="signin-component">
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
            <h1 className="signin-header">Sign In</ h1>
            <form className="signin-form" onSubmit={handleSubmit}>
              <label htmlFor="username" className="signin-label">
                Username:
              </label>
              <input
                type="text"
                className="signin-input"
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus />

              <label htmlFor="password" className="signin-label">
                Password:
              </label>
              <input
                type="password"
                className="signin-input"
                id='password'
                onChange={e => setPassword(e.target.value)}
                required />

              <button className="signin-submit" disabled={!!(!username || !password)}>Sign In</button>
            </form>
            <p className="register-link">
              Create an Account <a href="#sign-up" className="register-link">Here</a>
            </p>
          </div>
          )}
    </div>
  );
};

export default SignIn;

// import React from 'react';
// import AppContext from '../lib/app-context';

// const styles = {
//   signIn: {
//     marginTop: '5rem'
//   },
//   formContainer: {
//     backgroundColor: '#f1f3f5',
//     width: '30rem',
//     border: '1px solid lightgray',
//     borderRadius: '10px'
//   }
// };

// export default class Authentication extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: 'DemoUser',
//       password: 'password1',
//       isCorrect: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
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
//     fetch('/api/auth/sign-in', req)
//       .then(res => res.json())
//       .then(result => {
//         if (result.user && result.token) {
//           this.context.handleSignIn(result);
//           window.location.hash = '#';
//         } else {
//           this.setState({ isCorrect: false });
//         }
//       });
//   }

//   render() {
//     if (this.state.isCorrect !== false) {
//       return (
//         <div style={styles.signIn}>
//           <div className='d-flex justify-content-center'>
//             <h1 className='text-center my-5'><strong>Welcome Back!</strong></h1>
//           </div>
//           <h3 className='text-center'><strong>Please sign in to gain access to user features.</strong></h3>
//           <div className='d-flex justify-content-center'>
//             <div className='d-flex justify-content-center mx-1 mt-4 py-3' style={styles.formContainer}>
//               <form className='w-75' onSubmit={this.handleSubmit}>
//                 <div>
//                   <label htmlFor="username" className='form-label mt-2'>Username</label>
//                   <input
//                 required
//                 id='username'
//                 value={this.state.username}
//                 name='username'
//                 type="text"
//                 onChange={this.handleChange}
//                 className="form-control" />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className='form-label mt-2'>Password</label>
//                   <input
//               required
//               id="password"
//               value={this.state.password}
//               name='password'
//               type="password"
//               onChange={this.handleChange}
//               className="form-control" />
//                 </div>
//                 <div className='d-flex justify-content-end'>
//                   <button type='submit' className='btn btn-outline-info mt-3'>Sign In</button>
//                 </div>
//                 <div>
//                   <p className='text-center pt-4'>Not a user? Click <a href='#sign-up' className='text-info text-decoration-none'>here</a> to sign up!</p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       );
//     } else if (this.state.isCorrect === false) {
//       return (
//         <div>
//           <div className='d-flex justify-content-center'>
//             <h1 className='text-center my-5'><strong>Welcome Back!</strong></h1>
//           </div>
//           <h3 className='text-center'><strong>Please sign in to gain access to user features.</strong></h3>
//           <div className='d-flex justify-content-center'>
//             <div className='d-flex justify-content-center mx-1 mt-4 py-3' style={styles.formContainer}>
//               <form className='w-75' onSubmit={this.handleSubmit}>
//                 <div>
//                   <label htmlFor="username" className='form-label mt-2'>Username</label>
//                   <input
//                     required
//                     id='username'
//                     value={this.state.username}
//                     name='username'
//                     type="text"
//                     onChange={this.handleChange}
//                     className="form-control" />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className='form-label mt-2'>Password</label>
//                   <input
//                     required
//                     id="password"
//                     value={this.state.password}
//                     name='password'
//                     type="password"
//                     onChange={this.handleChange}
//                     className="form-control" />
//                 </div>
//                 <div>
//                   <p className='text-danger'>The username or password is incorrect.</p>
//                 </div>
//                 <div className='d-flex justify-content-end'>
//                   <button type='submit' className='btn btn-outline-info mt-3'>Sign In</button>
//                 </div>
//                 <div>
//                   <p className='text-center pt-4'>Not a user? Click <a href='#sign-up' className='text-info text-decoration-none'>here</a> to sign up!</p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }
// }
// Authentication.contextType = AppContext;
