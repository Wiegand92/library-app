import React, { useState } from 'react';
import {connect} from 'react-redux';

import {logIn, hideLoginForm} from '../store/loggedIn/actions'

const LoginForm = ({logIn, hideLoginForm, setUserID}) => {

  const [error, setError] = useState([]);
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formUsername;
    const password = formPassword;

    if(!username || !password){
      if(!username && !error.includes('username')) {setError(prev => [...prev, 'username'])};
      if(!password && !error.includes('password')) {setError(prev => [...prev, 'password'])};
      return;
    }

    // Check if user is attempting to sign up, set route accordingly //
    const route = e.target.className === 'sign-up' ? '/new-user' : '/authenticate';

    await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password 
      })
    })
    .then(response => {
      if(response.status === 200){
        return response.json()
      }
    })
    .then(({userID}) => {
      setUserID(userID);
      logIn();
      hideLoginForm();
    })
    .catch(err => console.error(err));
  }

  const handleDivClick = e => {
    if(e.target.className === 'log-in'){ hideLoginForm() }
  }

  const handleNull = (inputName) => {
    if(error.includes(inputName)){
      return 'error'
    }
  }

  const handleChange = (e, inputName) => {
    const change = e.target.value;

    switch(inputName){
      case 'username':
        if(error.length > 0) {setError(prev => prev.filter(err => err !== 'username'))};
        setFormUsername(change);
        break;
      case 'password':
        if(error.length > 0) {setError(prev => prev.filter(err => err !== 'password'))};
        setFormPassword(change);
        break;
    };
  };
  
  return (
    <div className="log-in" onClick={handleDivClick}>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} >
          <label htmlFor="username">Username:</label>
          <input type="text" value={formUsername} onChange={e => handleChange(e, 'username')} className={handleNull('username')} name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" value={formPassword} onChange={e => handleChange(e, 'password')} className={handleNull('password')} name="password" />
          <input type="submit" value="Login"/>
        </form>
        <button className="sign-up" onClick={handleSubmit}>Sign Up</button>
      </div>

    </div>
  );

};
const mapStateToProps = () => ({})
const mapDispatchToProps = {logIn, hideLoginForm}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)