import React from 'react';

const BookForm = ({refreshLibrary}) => {

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Destructure book values from form //
    const { 

      author: {value: author}, 
      title: {value: title}, 
      pages: {value: pages}, 
      read: {checked: read} 

    } = e.target.elements;

    const newBook = {
      author,
      title,
      pages,
      read
    }

    await fetch('/library', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newBook)
    })
    .then(() => refreshLibrary())
    .catch(err => console.error(err))

    console.log(author, title, pages, read)

  }

  return (
    <form className='book-form' onSubmit={handleSubmit}>
      <input type="text" name="title" id="title"/>
      <input type="text" name="author" id="author"/>
      <input type="number" name="pages" id="pages"/>
      <input type="checkbox" name="read" id="read"/>
      <input type="submit" value="Add Book"/>
    </form>
  )
}

export default BookForm