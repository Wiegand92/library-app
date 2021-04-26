import React, { useEffect, useState } from 'react';

const BookForm = ({refreshLibrary, hideBook, setBook, book}) => {

  const [formAuthor, setFormAuthor] = useState('');
  const [formPages, setFormPages] = useState(0);
  const [formRead, setFormRead] = useState(false);
  const [formTitle, setFormTitle] = useState('');

  useEffect(() => {

    if(!!book){
      const {author, pages, read, title} = book;

      if(author) setFormAuthor(author);
      if(pages) setFormPages(pages);
      if(read) setFormRead(read);
      if(title) setFormTitle(title);
    };

    return () => setBook({});

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = formAuthor;
    const title = formTitle;
    const pages = formPages;
    const read = formRead;

    const newBook = {
      author,
      title,
      pages,
      read
    };

    if(!!book._id){
      
      console.log('from /:bookID')
      await fetch(`/library/${book._id}`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(newBook)
      })
      .then(() => refreshLibrary())
      .then(() => hideBook())
      .catch(err => console.error(err));

    } else {
      
      await fetch('/library', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(newBook)
      })
      .then(() => refreshLibrary())
      .then(() => hideBook())
      .catch(err => console.error(err));

    }
  };

  const handleChange = (e, setterFn) => {
    const change = e.target.value;

    setterFn(change);
  };

  const handleCheck = e => {
    const change = e.target.checked;

    setFormRead(change);
  };

  const handleDivClick = e => {
    if(e.target.className === 'book-form'){ hideBook() };
  };

  return (
    <div className="book-form" onClick={handleDivClick}>
    <form onSubmit={handleSubmit}>
      <input type="text" value={formTitle} onChange={e => handleChange(e, setFormTitle)}/>
      <input type="text" value={formAuthor} onChange={e => handleChange(e, setFormAuthor)}/>
      <input type="number" value={formPages} onChange={e => handleChange(e, setFormPages)}/>
      <input type="checkbox" checked={formRead} onChange={handleCheck}/>
      <input type="submit" value={!!book ? "Update" : "Add Book"}/>
    </form>
    </div>
  )
}

export default BookForm