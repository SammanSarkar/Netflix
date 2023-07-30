import { useNavigate, Link, useLocation } from "react-router-dom";
// useNavigate: This is a hook provided by the "react-router-dom" library. It allows components to programmatically
// navigate between different routes in the application. It is typically used when you want to trigger
// navigation based on user interactions or specific conditions.

// Link: Another feature from "react-router-dom," the Link component creates a hyperlink to navigate to different 
// routes within the application. Unlike standard anchor tags (<a>), Link prevents the page from a full reload and
// efficiently handles navigation.

// useLocation: This is another hook from "react-router-dom" that provides access to the current location (URL) of 
// the application. It is useful for reading the current path, query parameters, and other location-related information.
import { initializeApp } from 'firebase/app';
import { getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { firebaseConfig } from './firebaseConfig.js';
import { useEffect, useState } from "react";
// useEffect is a built-in React hook that allows you to perform side effects in functional components. Side effects
//  are operations that are not directly related to rendering UI but can be essential in a component's lifecycle. 
//  Common side effects include fetching data from APIs, subscribing to events, setting up timers, and more.

// useState is another built-in React hook that enables functional components to have stateful behavior.
// State is a way to manage and store component-specific data that can change over time and trigger a re-render of the component when updated.
// The useState hook returns a stateful value and a function to update that value. It takes an initial value as an argument.


const Login = () => {
  initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === '/login' ? true:false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isUserExist, setUserExist ] = useState(false);
  const [ isEmailUsed, setIsEmailUsed] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

//   useState for email:

// This hook is used to declare a state variable called email.
// email will hold the current value, and setEmail is a function that will be used to update the value of email.

// useState for password:

// Similar to the email state, this hook declares a state variable called password.
// password will hold the current value, and setPassword is a function to update the value of password.

// useState for isUserExist:

// This hook declares a state variable called isUserExist, which is a boolean indicating whether a user exists or not.
// isUserExist will hold the current boolean value, and setUserExist is a function used to update this state.

// useState for isEmailUsed:

// Similar to isUserExist, this hook declares a state variable called isEmailUsed, indicating whether the email is already used or not.
// isEmailUsed will hold the current boolean value, and setIsEmailUsed is a function used to update this state.

// useState for emailValid:

// This hook declares a state variable called emailValid, which represents whether the email input is valid or not.
// emailValid will hold the current boolean value, and setEmailValid is a function to update this state.

// useState for passwordValid:

// Similar to emailValid, this hook declares a state variable called passwordValid, representing whether the password input is valid or not.
// passwordValid will hold the current boolean value, and setPasswordValid is a function to update this state.
//   const auth = getAuth();

  const validation = (fieldName, value) => {
    switch(fieldName) {
      case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case 'password':
        return value.length >= 6;
      default:
        break;
    }
  };

  const ctaClickHandler = (e) => {
    e.preventDefault();

    if(!validation('email', email) || !validation('password', password)){
      setEmailValid(validation('email', email));
      setPasswordValid(validation('password', password));
      return;
    }

    if(page){
      signInWithEmailAndPassword(auth, email, password)
      .then( auth => {
        if(auth){
          navigate('/dashboard');
        }
      })
      .catch( error => setUserExist(true));
      // user-not-found
    }else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(
        auth => {
          if(auth){
            navigate('/dashboard');
          }
        })
        .catch( error => setIsEmailUsed(true));
    }
  };

  useEffect(()=>{
    //remove error message
    setUserExist(false);
    setIsEmailUsed(false);
  },[location]);
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return(
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{ page ? 'Sign In' : 'Register'}</h1>
        <br/>
        <form>
          <input 
            className="form-control" 
            value={email} 
            onChange={emailOnChangeHandler} 
            type="email" 
            placeholder="Email"/>
          { !emailValid && <p className="text-danger">Email is invalid/blank</p> }
          <input 
            className="form-control"
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            type="password" 
            placeholder="Password"/>
          { !passwordValid && <p className="text-danger">Password is invalid/blank</p>}
          <button className="btn btn-danger btn-block" onClick={ctaClickHandler}>
            { page ? 'Sign In' : 'Register'}
          </button>
          <br/>
          {
            page && <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
              Remember Me
            </label>
          </div>
          }
        </form>
        <br/>
        <br/>
        { isUserExist && <p className="text-danger">User does not exist | Go for Signup</p> }
        { isEmailUsed && <p className="text-danger">Email already in use | Go for Sign In</p> }
        <div className="login-form-other">
          <div className="login-signup-now">
          { page ? 'New to Netflix?' : 'Existing User'} &nbsp;
            <Link className=" " to={page ? '/register' : '/login'}>
              { page ? 'Sign up now' : 'Sign In'}
            </Link>.
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
    </div>
  )
}

export default Login;