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

// MySQL session store configuration
const sessionStore = new MySQLStore({
  database: 'rabas',
  table: 'sessions',
  host: 'localhost',
  user: 'root',
  password: '0511',
  expiration: 86400000, // Session expiration time in milliseconds
  createDatabaseTable: true, // Automatically create sessions table if not exists
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, connection);

// Log session store configuration
console.log('Session store configuration:', sessionStore.options);

// Error handling for session store initialization
sessionStore.on('error', (error) => {
  console.error('Session store error:', error);
});

// Configure session middleware
app.use(session({
  secret: 'whats-on-your-mind',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: false, // Set to true if using HTTPS
    httpOnly: true // Prevents client-side access to the cookie
  }
}));

// Error handling middleware for Express
app.use((err, req, res, next) => {
  console.error('Error:', err);
   res.status(500).json({ success: false, message: 'Internal server error' });
});


// User Login Endpoint
app.post('/login', (req, res) => {
  const { identifier, password } = req.body; // Use 'identifier' to accept either username or email
  const sql = 'SELECT * FROM users WHERE (username = ? OR email = ?)'; // Update SQL query to retrieve user by username or email
  connection.query(sql, [identifier, identifier], async (err, results) => { // Removed 'AND password = ?' from SQL query
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (results.length > 0) {
      const user = results[0];
      try {
        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Set user data in the session upon successful login
          req.session.user = {
            user_id: user.user_id
          };
          console.log('User logged in:', req.session.user); // Log session use
          return res.json({ success: true, message: 'Login successful' });
        } else {
          return res.status(401).json({ success: false, message: 'Invalid password' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
  });
});


// Endpoint for checking login status
app.get('/check-login', (req, res) => {
  // Retrieve session data from the database
  sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.error('Error fetching session from database:', err);
      return res.status(500).json({ isLoggedIn: false, error: 'Internal server error' });
    }

    // Check if session exists and has user data
    if (session && session.user) {
      // User is logged in
      return res.status(200).json({ isLoggedIn: true, user: session.user });
    } else {
      // Session not found or user not logged in
      return res.status(200).json({ isLoggedIn: false });
    }
  });
});

// Endpoint to get userData from users table based on user_id
app.get('/get-userData', (req, res) => {
  // Check if user is logged in and session contains user_id
  if (req.session.user && req.session.user.user_id) {
    const userId = req.session.user.user_id;
    const sql = 'SELECT user_id, Fname, Lname, username, contact, email FROM users WHERE user_id = ?';

    connection.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      if (results.length > 0) {
        const userData = results[0];
        return res.json({ success: true, userData });
      } else {
        return res.status(404).json({ success: false, message: 'User data not found' });
      }
    });
  } else {
    // If user is not authenticated or session user_id is not set
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
});

// Endpoint for updating user profile
app.put('/update-profile', async (req, res) => {
  try {
    // Retrieve updated user profile data from the request body
    const { user_id, Fname, Lname, username, email, contact } = req.body;

    //console.log('Received Updated Profile request:', req.body);

    // Update the user profile in the database
    const sql = 'UPDATE users SET Fname = ?, Lname = ?, username = ?, email = ?, contact = ? WHERE user_id = ?';
    connection.query(sql, [Fname, Lname, username, email, contact, user_id], (err, results) => {
      if (err) {
        console.error('Error updating profile:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      // Check if the user profile was successfully updated
      if (results.affectedRows > 0) {
        return res.json({ success: true, message: 'Profile updated successfully' });
      } else {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint for updating user password
app.put('/update-password', async (req, res) => {
  try {
    // Retrieve updated user password data from the request body
    const { user_id, currentPassword, newPassword, confirmNewPassword } = req.body;

    console.log('Received Updated Password request:', req.body);

    // Check if newPassword and confirmPassword are equal
    if (!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "New password and confirm password do not match or are empty" });
    }

    // Fetch the hashed password of the user from the database
    const sql = 'SELECT password FROM users WHERE user_id = ?';
    connection.query(sql, [user_id], async (err, results) => {
      if (err) {
        console.error('Error fetching user password:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user password in the database
      const updateSql = 'UPDATE users SET password = ? WHERE user_id = ?';
      connection.query(updateSql, [hashedPassword, user_id], (err, updateResults) => {
        if (err) {
          console.error('Error updating password:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (updateResults.affectedRows > 0) {
          return res.json({ success: true, message: 'Password Changed Successfully' });
        } else {
          return res.status(500).json({ success: false, message: 'Failed to update password' });
        }
      });
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { username, firstName, lastName, email, address, phone, password, confirmPassword } = req.body;

  console.log('Received signup request:', req.body);

  // Check if password and confirmPassword are equal
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password and confirm password do not match or are empty" });
  }

  try {    
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password, Fname, Lname, address, email, contact) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(sql, [username, hashedPassword, firstName, lastName, address, email, phone], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        // Check if the error is a duplicate entry error
        if (err.code === 'ER_DUP_ENTRY') {
          // Customize the message based on the field that caused the duplication
          if (err.message.includes('username_UNIQUE')) {
            return res.status(400).json({ success: false, error: 'Username is already taken' });
          } else if (err.message.includes('email_UNIQUE')) {
            return res.status(400).json({ success: false, error: 'Email is already taken' });
          }
        }
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
      }

      console.log('Signup successful. Affected rows:', results.affectedRows);

      // Return a success response
      return res.json({ success: true, message: 'Signup successful' });
    });  
  } catch (error) {
    console.error('Error hashing password:', error);
    return res.status(500).json({ success: false, message: 'Error hashing password' });
  }
});

// Endpoint for user logout
app.post('/logout', (req, res) => {
  // Check if user session exists
  if (req.session.user) {
    // Remove user data from the session
    delete req.session.user;
  } 

  // Check if both admin and user sessions are zero
  if (!req.session.admin && !req.session.user && !req.session.employee) {
    // Destroy the session in the database using the session ID
    sessionStore.destroy(req.sessionID, (err) => {
      if (err) {
        console.error('Error destroying session in database:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      res.clearCookie('connect.sid');

      // Destroy the session on the server
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        // Session destroyed successfully
        return res.json({ success: true, message: 'Admin logout successful, session destroyed' });
      });
    });
  } else {
    // If either admin or user session exists, respond with success message
    return res.json({ success: true, message: 'Logout successful' });
  }

});

// Admin Login Endpoint
app.post('/admin/login', (req, res) => {
  const { identifier, password } = req.body; // Use 'identifier' to accept either username or email
  const sql = 'SELECT * FROM admin WHERE (username = ? OR email = ?)'; // Update SQL query to retrieve admin by username or email
  connection.query(sql, [identifier, identifier], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (results.length > 0) {
      const admin = results[0];
      try {
        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          // Set admin data in the session upon successful login
          req.session.admin = {
            admin_id: admin.admin_id
          };
          console.log('Admin logged in:', req.session.admin);
          return res.json({ success: true, message: 'Admin login successful' });
        } else {
          return res.status(401).json({ success: false, message: 'Invalid password' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'Admin not found' });
    }
  });
});

// Endpoint for checking login status
app.get('/admin/check-login', (req, res) => {
  // Retrieve session data from the database
  sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.error('Error fetching session from database:', err);
      return res.status(500).json({ isLoggedIn: false, error: 'Internal server error' });
    }

    // Check if session exists and has user data
    if (session && session.admin) {
      // User is logged in
      return res.status(200).json({ isLoggedIn: true, admin: session.admin });
    } else {
      // Session not found or user not logged in
      return res.status(200).json({ isLoggedIn: false });
    }
  });
});

// Endpoint for updating user password
app.put('/admin/update-password', async (req, res) => {
  try {
    // Retrieve updated user password data from the request body
    const { admin_id, currentPassword, newPassword, confirmNewPassword } = req.body;

    console.log('Received Updated Password request:', req.body);

    // Check if newPassword and confirmPassword are equal
    if (!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "New password and confirm password do not match or are empty" });
    }

    // Fetch the hashed password of the user from the database
    const sql = 'SELECT password FROM admin WHERE admin_id = ?';
    connection.query(sql, [admin_id], async (err, results) => {
      if (err) {
        console.error('Error fetching user password:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user password in the database
      const updateSql = 'UPDATE admin SET password = ? WHERE admin_id = ?';
      connection.query(updateSql, [hashedPassword, admin_id], (err, updateResults) => {
        if (err) {
          console.error('Error updating password:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (updateResults.affectedRows > 0) {
          return res.json({ success: true, message: 'Password Changed Successfully' });
        } else {
          return res.status(500).json({ success: false, message: 'Failed to update password' });
        }
      });
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Admin Logout Endpoint
app.post('/admin/logout', (req, res) => {
  // Check if admin session exists
  if (req.session.admin) {
    // Remove admin data from the session
    delete req.session.admin;
  } 
  
  // Check if both admin and user sessions are zero
  if (!req.session.admin && !req.session.user && !req.session.employee) {
    // Destroy the session in the database using the session ID
    sessionStore.destroy(req.sessionID, (err) => {
      if (err) {
        console.error('Error destroying session in database:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      
      res.clearCookie('connect.sid');

      // Destroy the session on the server
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        // Session destroyed successfully
        return res.json({ success: true, message: 'Admin logout successful, session destroyed' });
      });
    });
  } else {
    // If either admin or user session exists, respond with success message
    return res.json({ success: true, message: 'Logout successful' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));