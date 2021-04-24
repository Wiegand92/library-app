import React from 'react';

const LoginForm = ({logIn}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/authenticate', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          userName: e.target.elements['user-name'].value,
          password: e.target.elements['password'].value
        }
      })
    })
    .then(response => {
      if(response.status === 200){
        logIn()
      }
    })
    .catch(err => console.error(err));
  }

  return (
    <form
      className='log-in'
      onSubmit={handleSubmit}
    >
      <input type="text" name="user-name" />
      <input type="password" name="password" id=""/>
      <input type="submit" value="Login"/>
    </form>
  );

};

export default LoginForm