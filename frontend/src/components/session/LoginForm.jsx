import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sessionActions } from "../../store/session";
import { Navigate } from 'react-router-dom'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => {
        return state.session.user
    });

    if (sessionUser) return <Navigate to='/' replace={true} />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credential, password}))
            .catch(async (response) => {
                let data;
                try {
                    data = await response.clone().json();
                } catch {
                    data = await response.text()
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([response.statusText])
        })
    }
    
    return (
        <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginForm;