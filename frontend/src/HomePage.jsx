import { useSelector } from "react-redux";
import Splash from "./Splash";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "./components/session/LoginForm";
import './HomePage.css'

export default function HomePage() {
    const isLoggedIn = useSelector(state => !!state.session.user);
    const showModal = useSelector(state => state.session.showModal);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) navigate('/feed');
        const loginModal = document.getElementsByClassName("login.modal");
        loginModal
    }, [])



    return (
        <div className="home">
            <Splash /> 
        </div>
    )
}