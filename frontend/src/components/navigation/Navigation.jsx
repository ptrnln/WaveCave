import { useSelector } from "react-redux";
import './Navigation.css'
import ProfileButton from "./ProfileButton";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from '/WaveCave logo HomeNavLink.svg';


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
                <li>
                    <NavLink to='/' className='home-nav link'><img href="" width="100px" height="100%" className="logo" src={logo}></img></NavLink>
                </li>
                <li>
                    <span style={{'font-size': 'xx-large', 'color': 'white'}}>WaveCave</span>
                </li>
                { 
                sessionUser ?
                <> 
                    <li>
                        <ProfileButton className='profile button'user={sessionUser}/>
                    </li>
                </> :
                <>
                    <li>
                        <button className='nav-link login' onClick={navToSignUp}>Sign Up</button>
                    </li>
                    <li>
                        <button className='nav-link signup' onClick={navToLogin}>Log In</button>
                    </li>
                </>
                }
            </ul>
            {/* <a href="/login">Log In</a> */}
        </div>
    )
}

export default Navigation;