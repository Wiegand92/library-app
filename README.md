# Library App

## How to Use

### **Try the live site**

[Library App](https://sheltered-crag-34276.herokuapp.com/) click on this link to see the live version of the app. 

The login is 

Username: Alex Password

Password: S3cur3P4ssw0rd!

### **Make your own clone**

1. Clone the repo 

    `git clone https://github.com/Wiegand92/library-app`

Since this project uses mongo, you must have a mongo instance running when you start the repo. The program will look for .env variables for SECRET and DATABASE_URL to start.

2. Define env variables

3. Start the express server 
    
    ` npm start `

Optional

4. Start webpack dev server 

   ` npm run start-dev `

  This project uses webpack dev-server for live reloading. To use it you must have an instance of the express server running because webpack will try to proxy it to handle routes.

5. Have fun!

## About this project

This is a project done alongside The Odin Project fullstack javascript course. It holds a library of books and displays them to the user. To perform CRUD on the books you must be logged in. The books are persisted in a MongoDB database, and login is handled using passport.

### **What I learned**

This project was a great intro to user authentication and setting up a MongoDB instance online for me. I have touched on passport before but this was my first time setting up an actual login with hashed passwords and authentication. It's also the first full stack app that I have put online, so I got to work with setting up a database on MongoDB Atlas, as well as the Heroku CLI and GUI.

### **Tech Used**

  - React
  - TailwindCSS
  - ExpressJS
  - PassportJS
    - Passport-local
    - Passport-local-mongoose
  - Mongoose
  - MongoDB
  - Webpack