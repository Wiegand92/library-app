import React, { useState } from 'react';

const LoginForm = ({logIn, hideLogin}) => {

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

    await fetch('/authenticate', {
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
        logIn()
      }
    })
    .catch(err => console.error(err));
  }

  const handleDivClick = e => {
    if(e.target.className === 'log-in'){ hideLogin() }
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
    }
  };
  
  return (
    <div className="log-in" onClick={handleDivClick}>
      <form onSubmit={handleSubmit} >
        <label htmlFor="username">Username:</label>
        <input type="text" value={formUsername} onChange={e => handleChange(e, 'username')} className={handleNull('username')} name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" value={formPassword} onChange={e => handleChange(e, 'password')} className={handleNull('password')} name="password" />
        <input type="submit" value="Login"/>
      </form>
    </div>
  );

};

export default LoginForm