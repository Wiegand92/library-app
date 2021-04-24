import React from 'react';

const Header = ({showLogin}) => {
  return (
    <header>
      <button onClick={e => showLogin()}>Log In</button>
      <h1>My Library</h1>
    </header>
  )
};

export default Header;