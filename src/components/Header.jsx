import React from 'react';
import {connect} from 'react-redux';

import LogOutButton from './LogOutButton';
import {logOut, showLoginForm} from '../store/loggedIn/actions'

const Header = ({showLoginForm, isLogged, logOut, bookView, setBookView}) => {
  const handleChange = e => setBookView(e.target.value);

  return (
    <header>
      {isLogged ? <LogOutButton logOut={logOut}/> : <button onClick={e => showLoginForm()}>Log In</button>}
      
      <select value={bookView} onChange={handleChange}>
        <option className='selected' value='all'>All Books</option>
        <option className='selected' value='user'>My Books</option>
      </select>
      
      <h1>{bookView === 'all' ? 'The' : 'My' } Library</h1>
    </header>
  )
};

const mapStateToProps = (state) => ({
  isLogged: state.isLogged.isLogged
})
const mapDispatchToProps = {logOut, showLoginForm}

export default connect(mapStateToProps, mapDispatchToProps)(Header);