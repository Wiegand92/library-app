import React from 'react';

const BookCard = ({book, passBook, refreshLibrary, loggedIn}) => {

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
        refreshLibrary()
      } else {
        window.alert('Something went wrong, are you logged in?')
      } })
    .catch(err => console.error(err));
  };

  const handleClick = e => {
    if(loggedIn && e.target.className !== 'delete'){
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
      {loggedIn && <button
        onClick={handleDelete}
        className='delete'
      >Delete Book</button>}
    </div>
  )
};

export default BookCard;