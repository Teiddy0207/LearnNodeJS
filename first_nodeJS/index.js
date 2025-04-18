const express = require('express');
const path = require('path');
const session = require('express-session'); 

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true
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
