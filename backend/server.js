const express = require('express');
const mysql = require('mysql2'); // npm install mysql2
const cors = require('cors'); // npm install cors
const multer = require('multer'); // npm install multer
const path = require('path'); // path is a built-in Node.js module, no need to install
const session = require('express-session'); // npm install express-session
const MySQLStore = require('express-mysql-session')(session); // npm install express-mysql-session
const bcrypt = require('bcrypt'); //install bcrypt using this commant 'npm install bcrypt'
const nodemailer = require('nodemailer'); // npm install nodemailer
const crypto = require('crypto'); // crypto is a built-in Node.js module, no need to install

const app = express();
// app.use(cors());
// Enable CORS with credentials
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json()); // Parse JSON bodies

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0511',
  database: 'rabas'
});

// Error handling for database connection
connection.connect((err) => {
if (err) {
    console.error('Error connecting to database:', err);
    return;
}
console.log('Connected to database');
});

// Error handling middleware for Express
app.use((err, req, res, next) => {
  console.error('Error:', err);
   res.status(500).json({ success: false, message: 'Internal server error' });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));