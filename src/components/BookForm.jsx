import React, { useEffect, useState } from 'react';

const BookForm = ({refreshLibrary, hideBook, setBook, book}) => {

  const [formAuthor, setFormAuthor] = useState('');
  const [formPages, setFormPages] = useState(0);
  const [formRead, setFormRead] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [error, setError] = useState([])

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

    if(!author || !title || !pages){
      if(!author) setError(prev => [...prev, 'author']);
      if(!title) setError(prev => [...prev, 'title']);
      if(!pages) setError(prev => [...prev, 'pages']);
      return;
    }

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

  const handleChange = (e, inputName) => {
    const change = e.target.value;

    switch(inputName){
      case 'title':
        if(error.length > 0) {setError(prev => prev.filter(err => err !== 'title'))};
        setFormTitle(change);
        break;
      case 'author':
        if(error.length > 0) {setError(prev => prev.filter(err => err !== 'author'))};
        setFormAuthor(change);
        break;
      case 'pages':
        if(error.length > 0) {setError(prev => prev.filter(err => err !== 'pages'))};
        setFormPages(change);
        break;
    }
  };

  const handleCheck = e => {
    const change = e.target.checked;

    setFormRead(change);
  };

  const handleDivClick = e => {
    if(e.target.className === 'book-form'){ hideBook() };
  };

  const handleNull = (inputName) => {
    if(error.includes(inputName)){
      return 'error'
    }
  }

  return (
    <div className="book-form" onClick={handleDivClick}>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input type="text" className={handleNull('title')} value={formTitle} onChange={e => handleChange(e, 'title')}/>
      <label htmlFor="author">Author:</label>
      <input type="text" className={handleNull('author')} value={formAuthor} onChange={e => handleChange(e, 'author')}/>
      <label htmlFor="pages">Pages:</label>
      <input type="number" min='0' className={handleNull('pages')} value={formPages} onChange={e => handleChange(e, 'pages')}/>
      <label htmlFor="">Have You Read This Book?</label>
      <input type="checkbox" name='read' checked={formRead} onChange={handleCheck}/>
      <input type="submit" value={!!book ? "Update" : "Add Book"}/>
    </form>
    </div>
  )
}

export default BookForm