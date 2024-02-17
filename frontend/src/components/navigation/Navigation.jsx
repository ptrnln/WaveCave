import { useDispatch, useSelector } from "react-redux";
import './Navigation.css'
import ProfileButton from "./ProfileButton";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '/WaveCave logo HomeNavLink.svg';
import * as audioPlayerActions from '../../store/audioPlayer';
import * as trackActions from '../../store/track';
import * as sessionActions from '../../store/session';



const Navigation = () => {
    const isLoggedIn = useSelector(state => !!state.session.user)
    const dispatch = useDispatch();
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

    const showLoginModal = (e) => {
        e.preventDefault();
        dispatch(sessionActions.showModal());
    }

    const hideLoginModal = (e) => {
        e.preventDefault();
        dispatch(sessionActions.hideModal());
    }

    const handleLoadTracks = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/tracks');
            const data = await response.json();
            const tracks = data.tracks;
            dispatch(trackActions.receiveTracks(tracks));
            dispatch(audioPlayerActions.loadTracks(Object.keys(tracks)));
            dispatch(audioPlayerActions.playTrack())
        }
        catch (err) {
            console.error(err);
        }
    }


    return (
        <div id='navigation-bar'>
            <ul>
                <li key={'home-nav'}>
                    <NavLink to={ isLoggedIn ? '/feed' : '/' } className='home-nav link'><img href="" width="100px" height="100%" className="logo" src={logo}></img></NavLink>
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
                        <button className='nav-link login' onClick={showLoginModal}>Sign Up</button>
                    </li>
                    <li key={'nav-link signup'}>
                        <button className='nav-link signup' onClick={navToSignUp}>Log In</button>
                    </li>
                </>
                }
                <li key={'load some tracks'}>
                    <button onClick={handleLoadTracks}>Load some Tracks!</button>
                </li>
            </ul>
            {/* <a href="/login">Log In</a> */}
        </div>
    )
}

export default Navigation;