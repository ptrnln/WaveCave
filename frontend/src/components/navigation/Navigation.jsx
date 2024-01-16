import { useSelector } from "react-redux";
import './Navigation.css'
import ProfileButton from "./ProfileButton";


const Navigation = () => {
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
        <div id='NavBar'>
            <ul>
                { 
                sessionUser ?
                <> 
                    <li>
                        <ProfileButton user={sessionUser} />
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
        </div>
    )
}

export default Navigation;