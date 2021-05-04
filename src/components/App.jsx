import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';

import {loadBooks} from '../store/books/actions';

import BookForm from './BookForm';
import BookCard from './BookCard';
import LoginForm from './LoginForm';
import Header from './Header';

const App = ({books, loadBooks, isLogged, showLoginForm}) => {

  const [bookView, setBookView] = useState('all');

  // Holds user id to submit books on a by user basis //
  const [userID, setUserID] = useState('');

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

  const [book, setBook] = useState({});

  const passBook = useCallback((book) => {
    setBook(book);
  });

  const showBook = useCallback(() => {
    setBookForm(true)
  });

  const hideBook = useCallback(() => {
    setBookForm(false)
  });

  useEffect(() => { if(book._id) showBook() }, [book]);


  // Request books on initial render //
  useEffect( () => {loadBooks()}, []);

  return (
    <div className="app">
      <Header 
        showLogin={showLogin}
        bookView={bookView}
        setBookView={setBookView}
      />

      <div className="books">
        {books.map(book =>{
          const Book = <BookCard
            book={book}
            key={book._id}
            passBook={passBook}
            showBook={showBook}
            userID={userID}
          />

          return bookView === 'all' ? Book : book.userID === userID && Book
        }
        )}
      </div>

      { // Show login form if not logged in, and requested //
        !isLogged && showLoginForm && 
        <LoginForm
          hideLogin={hideLogin}
          setUserID={setUserID}
        />
      }

      { // Show book form if logged in, and requested //
        isLogged && bookForm &&
        <BookForm 
          hideBook={hideBook}
          setBook={setBook}
          book={!!book._id ? book : ''}
          userID={userID}
        />
      }

      { // Show footer if logged in //
        isLogged && 
        <div className="footer">
          <button onClick={showBook}>Add Book</button>
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  books: state.books.books,
  isLogged: state.isLogged.isLogged,
  showLoginForm: state.isLogged.showLoginForm
});

const mapDispatchToProps = {loadBooks}

export default connect(mapStateToProps, mapDispatchToProps)(App);