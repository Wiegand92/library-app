const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, 
  {useNewUrlParser:true, useUnifiedTopology: true}
).catch(err => console.error(err));
mongoose.set('useCreateIndex', true);

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  read: Boolean
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const Library = mongoose.model("Book", bookSchema);

const User = mongoose.model("User", userSchema);

module.exports = {Library, User};