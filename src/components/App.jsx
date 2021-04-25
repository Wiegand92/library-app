import React, {useEffect, useState, useCallback} from 'react';

import BookForm from './BookForm';
import BookCard from './BookCard';
import LoginForm from './LoginForm';
import Header from './Header';

const App = () => {

  // Holds the book data from database //
  const [library, setLibrary] = useState([]);

  // Will conditionally render features available to registered users //
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setLoggedIn(true)
  });

  const logOut = useCallback(() => {
    setLoggedIn(false)
  });

  // Will conditionally render the login form //
  const [loginForm, setLoginForm] = useState(false);

  const showLogin = useCallback(() => {
    setLoginForm(true)
  });

  const hideLogin = useCallback(() => {
    setLoginForm(false)
  });

  // Will conditionally render the book form //
  const [bookForm, setBookForm] = useState(false);

  const showBook = useCallback(() => {
    setBookForm(true)
  });

  const hideBook = useCallback(() => {
    setBookForm(false)
  });

  // Holds the logic to request books from database //
  const refreshLibrary = useCallback( async () => {
    const books = [];
    await fetch('/library')
    .then(response => response.json())
    .then(data => books.push(...data))
    .then(() => {setLibrary(books)})
    .catch(err => console.error(err));
  });

  // Request books on initial render //
  useEffect( () => refreshLibrary(), []);

  return (
    <div className="app">
      <Header showLogin={showLogin} logOut={logOut} loggedIn={loggedIn}/>

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

      { // Show login form if not logged in, and requested //
        !loggedIn && loginForm && 
        <LoginForm 
          logIn={logIn} 
          hideLogin={hideLogin}
        />
      }

      { // Show book form if logged in, and requested //
        loggedIn && bookForm &&
        <BookForm refreshLibrary={refreshLibrary} hideBook={hideBook}/>
      }

      { // Show footer if logged in //
        loggedIn && 
        <div className="footer">
          <button onClick={showBook}>Add Book</button>
        </div>
      }
    </div>
  );
};

export default App;