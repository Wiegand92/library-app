const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Database Imports //

const {Library, User} = require('./server/db/db')

// If we deploy, will set the port to whatever server, else 4200 //
const PORT = process.env.PORT || 4200;

//Middleware//
app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//Serve static files//
app.use(express.static(__dirname + '/public'));


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Authenticate User //
app.post('/authenticate', (req, res) => {

  const user = new User({
    username: req.body.user.userName, 
    password: req.body.user.password
  });
  
  req.login(user, function(err){
    if(err) {
      console.error(err);
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  });

});

// Log Out User //
app.get('/logout', (req, res) => {
  req.logout()
  res.status(200).send()
})

// Add User //
app.post('/new-user', async (req, res) => {
  const { user } = req.body;

  User.register({username: user.userName}, user.password, function(err, user){
    if(err) {
      console.error(err);
      res.status(400).send()
    } else {
      passport.authenticate("local", {
        failureFlash: true
      });
      res.status(200).send();
    }
  })

});

// Get Library //
app.get('/library', async (req, res) => {

  await Library.find({})
  .then(data => res.send(data))
  .catch(err => console.error(err));

})

// Post book to library //
app.post('/library', async (req, res) => {

  if(req.isAuthenticated()){
    const { author, title, pages, read } = req.body;

    const newBook = {
      author,
      title,
      pages,
      read
    };

    const book = new Library(newBook);

    book.save()
    .then(() => res.status(200).send())
    .catch(err => console.error(err));
  } else {
    res.status(403).send()
  }
});

// Delete book from Library //
app.delete('/library', async (req, res) => {
  if(req.isAuthenticated()){
    const { book } = req.body;

    await Library.deleteOne(book)
    .then(() => res.status(200).send())
    .catch(err => console.error(err));
  } else {
    res.status(403).send()
  }
});

// Start Server //
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
});