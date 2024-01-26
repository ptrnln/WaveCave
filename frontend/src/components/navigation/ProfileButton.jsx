import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import './ProfileButton.css'



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null)
    
    const toggleMenu = (e) => {
      e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
      setShowMenu(!showMenu);
    };

    const handleUploadClick = (e) => {
      e.preventDefault();

    }
    
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!dropdownRef?.current?.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      window.addEventListener('click', closeMenu);
    
      return () => window.removeEventListener('click', closeMenu);
    }, [showMenu]);
  
    const logout = (e) => {
      
      e.preventDefault();
      dispatch(sessionActions.logout());
    };
  
    return (
      <div className='profile-menu'>
        <button onClick={toggleMenu}>
          <i className="fa-solid fa-user-circle" />
        </button>
        {showMenu && (
          <ul className="profile-dropdown" ref={dropdownRef}>
            <NavLink to={`/${user.username}`}>{user.username}</NavLink>
            <li>{user.email}</li>
            <li>
              {/* <button onClick={handleUploadClick}>Upload Tracks</button> */}
              <NavLink className="nav-button" to='/upload'>Upload Tracks</NavLink>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    );
  }
  
export default ProfileButton;