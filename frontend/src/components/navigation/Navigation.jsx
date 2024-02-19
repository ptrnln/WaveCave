import { useDispatch, useSelector } from "react-redux";
import './Navigation.css'
import ProfileButton from "./ProfileButton";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '/images/WaveCave logo HomeNavLink.svg';
import * as audioPlayerActions from '../../store/audioPlayer';
import * as trackActions from '../../store/track';
import * as sessionActions from '../../store/session';



const Navigation = () => {
    const isLoggedIn = useSelector(state => !!state.session.user)
    const dispatch = useDispatch();
    const profButtonRef = useRef();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    const navToLogin = (e) => {
        e.preventDefault(); 
        navigate('/login', { replace: true });
    }

    const navToSignUp = (e) => {
        e.preventDefault();
        navigate('/signup');
    }

    const navToFeed = (e) => {
        e.preventDefault();
        navigate('/feed', { replace: true })
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
            debugger
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
                    <NavLink to={ isLoggedIn ? '/feed' : '/' } className='home-nav link'><img href=""  className="logo" src={logo}></img></NavLink>
                </li>
                <li key={'site-name'}>
                    <span style={{'fontSize': 'xx-large', 'color': 'white'}}>WaveCave</span>
                </li>
                <li key='nav-link feed'>
                    <NavLink to='/feed' className='feed-nav link'>Feed</NavLink>
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
                        <button className='nav-link signup' onClick={showLoginModal}>Log In</button>
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