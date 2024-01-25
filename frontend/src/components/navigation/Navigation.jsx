import { useSelector } from "react-redux";
import './Navigation.css'
import ProfileButton from "./ProfileButton";
import { useRef } from "react";


const Navigation = () => {
    const profButtonRef = useRef();
    const sessionUser = useSelector(state => state.session.user);

    const navToLogin = (e) => {
        e.preventDefault(); 
        location.href='/login';
    }

    const navToSignUp = (e) => {
        e.preventDefault();
        location.href='/signup';
    }

    return (
        <div id='navigation-bar'>
            <ul>
                { 
                sessionUser ?
                <> 
                    <li>
                        <ProfileButton className='profile button'user={sessionUser}/>
                    </li>
                </> :
                <>
                    <li>
                        <button onClick={navToSignUp}>Sign Up</button>
                    </li>
                    <li>
                        <button onClick={navToLogin}>Log In</button>
                    </li>
                </>
                }
            </ul>
            {/* <a href="/login">Log In</a> */}
        </div>
    )
}

export default Navigation;