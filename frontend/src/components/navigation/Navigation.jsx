import { useDispatch, useSelector } from "react-redux";
import './Navigation.css'
import ProfileButton from "./ProfileButton";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from '/WaveCave logo HomeNavLink.svg';
import * as audioPlayerActions from '../../store/audioPlayer';
import * as trackActions from '../../store/track';



const Navigation = () => {
    const dispatch = useDispatch()
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
                <li key={'home-nav'}>
                    <NavLink to='/' className='home-nav link'><img href="" width="100px" height="100%" className="logo" src={logo}></img></NavLink>
                </li>
                <li key={'site-name'}>
                    <span style={{'fontSize': 'xx-large', 'color': 'white'}}>WaveCave</span>
                </li>
                { 
                sessionUser ?
                <> 
                    <li key={'profile-button'}>
                        <ProfileButton className='profile button'user={sessionUser}/>
                    </li>
                </> :
                <>
                    <li key={'nav-link login'}>
                        <button className='nav-link login' onClick={navToSignUp}>Sign Up</button>
                    </li>
                    <li key={'nav-link signup'}>
                        <button className='nav-link signup' onClick={navToLogin}>Log In</button>
                    </li>
                </>
                }
                <li key={'load some tracks'}>
                    <button onClick={(e) => {
                        e.preventDefault();
                        dispatch(trackActions.loadTracks([22, 2]));
                        dispatch(audioPlayerActions.loadTracks([22, 2]))
                    }}>Load some Tracks!</button>
                </li>
            </ul>
            {/* <a href="/login">Log In</a> */}
        </div>
    )
}

export default Navigation;