class Book {
  constructor (title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }

  setRead() {
    this.read = true;
  }

  setNotRead() {
    this.read = false;
  }

  info() {
    console.log(`${this.title} by ${this.author} pages ${this.pages} ${this.read ? 'read' : 'not read yet'}`)
  }

};

const myBook = new Book('Outliers', 'Malcolm Gladwell', 300);

myBook.setRead()
myBook.info()