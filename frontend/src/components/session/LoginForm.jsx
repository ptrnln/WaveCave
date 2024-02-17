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

  const clickListener =(e) => {
    const modal = document.querySelector(".login.modal");
    const loginButton = document.querySelector("button.nav-link.login");
    const signInButton = document.querySelector("button.nav-link.signup");
    if(!modal.contains(e.target) && e.target !== loginButton && e.target !== signInButton) {
      dispatch(sessionActions.hideModal());
    }
  };

  const activateGreyout = () => {
    document.querySelector("div#greyout")?.classList?.add("active");
    return true
  }


  useEffect(() => {
    if(sessionUser) {
      document.querySelector("div#greyout")?.classList?.remove("active")
      dispatch(sessionActions.hideModal());
    } else {
      window.addEventListener('click', clickListener);
    }
    return(() => {
      window.removeEventListener('click', clickListener);
    })
  }, [sessionUser])
    
    // useEffect(() => {
    //   const modal = document.querySelector("div.login.modal");
    //   const greyout = document.querySelector("div#greyout");
    //   
    //   if(showModal) {
    //     if(modal.classList.contains("hidden")) modal.classList.remove("hidden");
    //     if(!document.body.classList.contains("stop-scrolling")) document.body.classList.add("stop-scrolling");
    //     if(!greyout.classList.contains("active")) greyout.classList.add("active");
    //     if(!modal.classList.contains("shown")) modal.classList.add("shown");
    //   }
    //   else {
    //     if(modal.classList.contains("shown")) modal.classList.remove("shown");
    //     if(document.body.classList.contains("stop-scrolling")) document.body.classList.remove("stop-scrolling");
    //     if(greyout.classList.contains("active")) greyout.classList.remove("active");
    //     if(!modal.classList.contains("hidden")) modal.classList.add("hidden");
    //   }
    // }, [showModal])
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const loginData = dispatch(sessionActions.login({credential, password}))
    //   .catch(response => {   
    //       if (response.errors) useSetErrors(response.errors);
    //       else if (response) useSetErrors([response]);
    //       else useSetErrors([response.statusText]);
    // })
    // if(loginData.user) dispatch(sessionActions.hideModal());
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
      {showModal && activateGreyout() &&
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
      }
    </>
  );
}

export default LoginForm;