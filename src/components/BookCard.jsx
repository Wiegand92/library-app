import React from 'react';

const BookCard = ({book, refreshLibrary, loggedIn}) => {

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
  }

  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <h3>{book.author}</h3>
      <p>Pages: {book.pages}</p>
      {loggedIn && <button
        onClick={handleDelete}
      >Delete Book</button>}
    </div>
  )
};

export default BookCard;