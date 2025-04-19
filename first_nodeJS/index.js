const express = require('express');
const path = require('path');
const session = require('express-session'); 
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));
  
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/item.routes');
app.use('/', authRoutes);


// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
