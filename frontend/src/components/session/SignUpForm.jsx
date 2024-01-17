import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Navigate } from "react-router-dom";
import './SignUpForm.css'

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return <Navigate to='/' replace={true} />

    const handleSubmit = e => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signUp({ email, username, password }))
                .catch(async res => {
                    let data;
                    try  {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                })
        }
        return setErrors(['Confirm Password field must contain the same value as the Password field'])
    }

    return (
        <>
            <form className='SignUpForm' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label htmlFor="email">Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label htmlFor="username">Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label htmlFor="password">Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label htmlFor="confirmPassword">Confirm Password:
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}


export default SignUpForm