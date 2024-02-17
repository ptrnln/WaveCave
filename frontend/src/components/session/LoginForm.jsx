import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './LoginForm.css'



function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.session.errors);
  // const [modalState, setModalState] = useState('username/email');
  
  const showModal = useSelector(state => state.session.showModal);
  const sessionUser = useSelector(state => state.session.user);

  const clickListener = (e) => {
    debugger
    const modal = document.querySelector(".login.modal");
    const loginButton = document.querySelector("button.nav-link.login");
    const signInButton = document.querySelector("button.nav-link.signup");
    if(!modal.contains(e.target) && e.target !== loginButton && e.target !== signInButton) {
      dispatch(sessionActions.hideModal());
    }
  };

  const activateGreyout = () => {
    document.querySelector("div#greyout").classList.add("active");
    return true
  }

  const deactivateGreyout = () => {
    document.querySelector("div#greyout").classList.remove("active");
    return true
  }

  useEffect(() => {
    window.addEventListener('click', clickListener) 
    return () => {
      window.removeEventListener('click', clickListener);
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await dispatch(sessionActions.login({credential, password}));
    if(!loginData.errors) {
      dispatch(sessionActions.hideModal());
    }
  }

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const loginData = await dispatch(sessionActions.login({
      credential: 'Demo-lition',
      password: 'password'
    }))
    if(!loginData.errors) {
      dispatch(sessionActions.hideModal());
    }
  }

  return (
    <>
      {showModal ? activateGreyout() &&
      <div className="login modal">
        <form className='login-form'>
        <h1>Log In</h1>
          <label>
            Username or Email:
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <ul className="error messages">
            {errors.map(error => <li>* {error}</li>)}
          </ul>
          <button 
            className="login button"
            type="submit"
            onClick={handleSubmit}>Log In</button>
          <button 
            className="login button demo"
            onClick={handleDemoLogin}>Demo Log In</button>
        </form>
      </div>
      :
      deactivateGreyout() && false
      }
    </>
  );
}

export default LoginForm;