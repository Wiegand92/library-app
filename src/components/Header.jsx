import React from 'react';
import LogOutButton from './LogOutButton'

const Header = ({showLogin, loggedIn, logOut}) => {
  return (
    <header>
      {loggedIn ? <LogOutButton logOut={logOut}/> : <button onClick={e => showLogin()}>Log In</button>}
      <h1>My Library</h1>
    </header>
  )
};

export default Header;