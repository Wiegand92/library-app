import React from 'react';
import {connect} from 'react-redux';

import {loadBooks} from '../store/books/actions';

const BookCard = ({book, passBook, loadBooks, loggedIn, userID}) => {

  const handleDelete = async (e) => {
    e.preventDefault();

    const deleteBook = { book: {
      author: book.author,
      title: book.title,
      pages: book.pages
    }}
    
    await fetch('/library',{
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(deleteBook)
    })
    .then(response => {
      if(response.status === 200){
        loadBooks()
      } else {
        window.alert('Something went wrong, are you logged in?')
      } })
    .catch(err => console.error(err));
  };

  const handleClick = e => {
    if(loggedIn && book.userID === userID && e.target.className !== 'delete'){
      passBook(book)
    }
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <h2>{book.title}</h2>
      <h3>{book.author}</h3>
      <p>
        Pages: {book.pages} <br/>
        {book.read? 'You have read this book.': 'You have not read this book'}
      </p>
      {loggedIn && book.userID === userID && <button
        onClick={handleDelete}
        className='delete'
      >Delete Book</button>}
    </div>
  )
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {loadBooks};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
