import React from 'react';

const LogOutButton = ({logOut}) => {

  const handleClick = async (e) => {
    e.preventDefault();
    await fetch('/logout')
    .then(response => {
      console.log(response);
      
      logOut();
    })
  };

  return (
    <button className='log-out' onClick={handleClick}>Log Out</button>
  );

};

export default LogOutButton;