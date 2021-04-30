import React from 'react';
import LogOutButton from './LogOutButton'

const Header = ({showLogin, loggedIn, logOut, bookView, setBookView}) => {
  const handleChange = e => setBookView(e.target.value);

  return (
    <header>
      {loggedIn ? <LogOutButton logOut={logOut}/> : <button onClick={e => showLogin()}>Log In</button>}
      
      <select value={bookView} onChange={handleChange}>
        <option className='selected' value='all'>All Books</option>
        <option className='selected' value='user'>My Books</option>
      </select>
      
      <h1>{bookView === 'all' ? 'The' : 'My' } Library</h1>
    </header>
  )
};

export default Header;