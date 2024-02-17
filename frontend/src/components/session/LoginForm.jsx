import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Navigate } from 'react-router-dom'
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.session.errors);
    // const [modalState, setModalState] = useState('username/email');
    
    const showModal = useSelector(state => state.session.showModal);
    const sessionUser = useSelector(state => state.session.user);

    // if (sessionUser) return <Navigate to='/' replace={true} />

    useEffect(() => {
      if(sessionUser) dispatch(sessionActions.hideModal())
    }, [sessionUser])

    useEffect(() => {
      const clickListener = document.addEventListener('click', (e) => {
        debugger
        e.preventDefault();
        const modal = document.querySelector(".login.modal");
        const loginButton = document.querySelector("button.nav-link.login");
        const signInButton = document.querySelector("button.nav-link.signup");
        if(!modal.contains(e.target) && e.target !== loginButton && e.target !== signInButton) {
          dispatch(sessionActions.hideModal());
        }
      });
      // return(() => {
      //   document.removeEventListener('click', clickListener)
      // })
    }, [])
    
    useEffect(() => {
      const modal = document.querySelector("div.login.modal")
      if(showModal) {
        if(modal.classList.contains("hidden")) modal.classList.remove("hidden");
        if(!document.body.classList.contains("stop-scrolling")) document.body.classList.add("stop-scrolling");
        if(!modal.classList.contains("shown")) modal.classList.add("shown");
      }
      else {
        if(modal.classList.contains("shown")) modal.classList.remove("shown");
        
        if(!modal.classList.contains("hidden")) modal.classList.add("hidden");
      }
    }, [showModal])
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // const loginData = dispatch(sessionActions.login({credential, password}))
        //   .catch(response => {   
        //       if (response.errors) useSetErrors(response.errors);
        //       else if (response) useSetErrors([response]);
        //       else useSetErrors([response.statusText]);
        // })
        // if(loginData.user) dispatch(sessionActions.hideModal());
        dispatch(sessionActions.login({credential, password}))
        return loginData;
    }

    const handleDemoLogin = (e) => {
      e.preventDefault();
      dispatch(sessionActions.login({
        credential: 'Demo-lition',
        password: 'password'
      }))
  }

  return (
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
  );
}

export default LoginForm;