import React, {useEffect, useState, useCallback} from 'react';

import BookForm from './BookForm';
import BookCard from './BookCard';
import LoginForm from './LoginForm';
import LogOutButton from './LogOutButton'

const App = () => {

  const [library, setLibrary] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setLoggedIn(true)
  });

  const logOut = useCallback(() => {
    setLoggedIn(false)
  })

  const refreshLibrary = useCallback( async () => {
    const books = [];
    await fetch('/library')
    .then(response => response.json())
    .then(data => books.push(...data))
    .then(() => {setLibrary(books)})
    .catch(err => console.error(err));
  });

  useEffect( () => refreshLibrary(), []);

  return (
      <div className="app">
        <h1>My Library</h1>
        <h2>Books</h2>

        <div className="books">
          {library.map(book =>
            <BookCard
              book={book}
              refreshLibrary={refreshLibrary}
              key={book._id}
              loggedIn={loggedIn}
            />
          )}
        </div>

        {!loggedIn && <LoginForm logIn={logIn}/>}

        {loggedIn && 
          <div>
            <h2>New Book</h2>
            <BookForm refreshLibrary={refreshLibrary} />
            <LogOutButton logOut={logOut}/>
          </div>
        }
      </div>
  );
};

export default App;