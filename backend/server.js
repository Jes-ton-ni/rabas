require('dotenv').config();
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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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
  database: process.env.SESSION_DB_NAME,
  table: 'sessions',
  host: process.env.SESSION_DB_HOST,
  user: process.env.SESSION_DB_USER,
  password: process.env.SESSION_DB_PASSWORD,
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
    const sql = 'SELECT user_id, Fname, Lname, username, contact, email, image, image_path FROM users WHERE user_id = ?';

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

// Multer configuration for storing uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Filename includes timestamp to avoid conflicts
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Endpoint for updating user profile
app.put('/updateUserProfile/:id', upload.single('profilePic'), (req, res) => {
  const userId = req.params.id;
  let { username } = req.body;
  let imagePath = req.body.image_path; // Existing image path
  let imageFileName = req.body.image;  // Existing image filename

  // If a new file is uploaded, replace both image path and filename
  if (req.file) {
    imagePath = req.file.path; // Update the image path with the newly uploaded file
    imageFileName = req.file.filename; // Save the uploaded filename
  }

  // Build dynamic SQL query for updating fields
  let sql = 'UPDATE users SET ';
  const params = [];

  // Only update the username if it's provided
  if (username) {
    sql += 'username = ?, ';
    params.push(username);
  }

  // Always update image filename and image path if file was uploaded
  if (imageFileName && imagePath) {
    sql += 'image = ?, image_path = ?, ';
    params.push(imageFileName, imagePath);
  }

  // Remove the last comma and space from the SQL query
  sql = sql.slice(0, -2) + ' WHERE user_id = ?';
  params.push(userId);

  // Execute the query
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error updating user profile:', err);
      return res.status(500).json({ success: false, message: 'Failed to update user profile' });
    }
    if (results.affectedRows === 0) {
      // No user found with the given ID
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, message: 'User updated successfully', updatedUserData: { username, imageFileName, imagePath } });
  });
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

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID'); // Replace with your Google Client ID

//google login endpoint
app.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID', // Specify the client ID of the app
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

    // Check if the user exists in your database
    const checkUserSql = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkUserSql, [email], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.length > 0) {
        // User already exists, login the user
        return res.json({ success: true, message: 'Login successful', user: results[0] });
      } else {
        // User doesn't exist, create a new user in the database
        const insertUserSql = 'INSERT INTO users (username, Fname, Lname, address, email, contact) VALUES (?, ?, ?, ?, ?, ?)';
        const defaultUsername = email.split('@')[0]; // Generate username from email
        const defaultAddress = 'N/A'; // You can set a default address if none is provided
        const defaultPhone = 'N/A'; // Default phone number if not available

        connection.query(insertUserSql, [defaultUsername, firstName, lastName, defaultAddress, email, defaultPhone], (insertErr, insertResults) => {
          if (insertErr) {
            console.error('Error inserting user into the database:', insertErr);
            return res.status(500).json({ success: false, message: 'Internal server error' });
          }

          console.log('New Google user created successfully.');
          return res.json({ success: true, message: 'Signup and login successful', userId: insertResults.insertId });
        });
      }
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return res.status(401).json({ success: false, message: 'Invalid Google token' });
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

// Business application endpoint
app.post('/submitBusinessApplication', async (req, res) => {
  const {
    user_id,
    firstName,
    lastName,
    businessName,
    businessTerritory,
    certificateNo,
    businessScope,
    businessType,
    category,
    location    
  } = req.body;

  console.log('Received business application request:', req.body);

  // Input validation (ensure all fields are provided)
  if (
    !user_id || !firstName || !lastName || !businessName || !businessTerritory ||
    !certificateNo || !businessScope || !businessType || !category || !location
  ) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  // Function to generate a random 6-digit number for application_id
  const generateApplicationId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
  };

  // Function to check if application_id exists in the database
  const isApplicationIdUnique = async (application_id) => {
    const sql = 'SELECT COUNT(*) AS count FROM business_applications WHERE application_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(sql, [application_id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0].count === 0); // Returns true if unique (count is 0)
      });
    });
  };

  // Generate a unique 6-digit application_id
  let application_id;
  let unique = false;

  while (!unique) {
    application_id = generateApplicationId();
    unique = await isApplicationIdUnique(application_id);
  }

  try {
    // SQL query to insert business application data into the database, including application_id
    const sql = `
      INSERT INTO business_applications (
        application_id, user_id, firstName, lastName, businessName, businessTerritory,
        certNumber, businessScope, businessType, category, location
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the SQL query
    connection.query(
      sql, 
      [application_id, user_id, firstName, lastName, businessName, businessTerritory, certificateNo, businessScope, businessType, category, location],
      (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);

          // Handle potential errors, e.g., unique constraints, SQL errors
          return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
        }

        console.log('Business application submitted successfully. Affected rows:', results.affectedRows);

        // Return a success response with the generated application_id
        return res.json({ success: true, message: 'Business application submitted successfully', application_id });
      }
    );
  } catch (error) {
    console.error('Error processing business application:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to fetch applications for the logged-in user
app.get('/businesses-application', (req, res) => {

  const userId = req.session?.user?.user_id;

  if (!userId) {
    // Send a response if userId is not found
    return res.status(400).json({ success: false, message: 'User not logged in or user ID missing' });
  }

  const sql = `
    SELECT * FROM business_applications WHERE user_id = ?
  `;
  
  // Execute the SQL query with the user ID
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    
    // Send the list of business applications for the logged-in user
    return res.json({ success: true, business_applications: results });
  });
});


//Para sa pag display ng business

// Endpoint to fetch businesses
app.get('/get-businessData', (req, res) => {
  const userId = req.session?.user?.user_id;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User not logged in or user ID missing' });
  }

  const sql = `SELECT * FROM businesses WHERE user_id = ?`;
  
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.json({ success: true, businessData: results });
    } else {
      return res.status(404).json({ success: false, message: 'Business data not found' });
    }
  });
});

// Endpoint for updating business logo
app.put('/updateBusinessLogo/:id', upload.single('businessLogo'), (req, res) => {
  const businessId = req.params.id;

  // Check if a new logo file was uploaded
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No logo file uploaded' });
  }

  // Prepare the new logo path
  const newLogoPath = req.file.path; // Update with the correct path where the logo is stored

  // Update the businessLogo field in the businesses table
  connection.query('UPDATE businesses SET businessLogo = ? WHERE business_id = ?', [newLogoPath, businessId], (err, results) => {
    if (err) {
      console.error('Error updating business logo:', err);
      return res.status(500).json({ success: false, message: 'Failed to update business logo' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    return res.json({
      success: true,
      message: 'Business logo updated successfully',
      updatedLogoPath: newLogoPath,
    });
  });
});

// Endpoint for updating business card image
app.put('/updateBusinessCardImage/:id', upload.single('businessCardImage'), (req, res) => {
  const businessId = req.params.id;

  // Fetch the current business data to get the existing businessCard JSON
  connection.query(
    'SELECT businessCard FROM businesses WHERE business_id = ?', 
    [businessId], (err, results) => {
    if (err) {
      console.error('Error fetching business data:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch business data' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    // The businessCard is already a JavaScript object, no need to parse it
    let businessCard = results[0].businessCard;

    // Update the cardImage if a new file was uploaded
    if (req.file) {
      businessCard.cardImage = req.file.path; // Update the cardImage path
    }

    // Update the database with the modified businessCard JSON
    connection.query('UPDATE businesses SET businessCard = ? WHERE business_id = ?', [JSON.stringify(businessCard), businessId], (err) => {
      if (err) {
        console.error('Error updating business card image:', err);
        return res.status(500).json({ success: false, message: 'Failed to update business card image' });
      }

      return res.json({
        success: true,
        message: 'Business card image updated successfully',
        updatedBusinessCard: businessCard,
      });
    });
  });
});

// Endpoint for updating business details
app.put('/updateBusinessDetails/:id', (req, res) => {
  const businessId = req.params.id;
  const { description, location, priceRange } = req.body;

  if (!description || !location || !priceRange) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Fetch the current business data to get the existing businessCard JSON
  connection.query(
    'SELECT businessCard FROM businesses WHERE business_id = ?', 
    [businessId], 
    (err, results) => {
      if (err) {
        console.error('Error fetching business details:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch business details' });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Business not found' });
      }

      // Parse businessCard if it exists, otherwise use an empty object
      let businessCard = results[0].businessCard;

      // Update the businessCard object with the new details
      businessCard.description = description;
      businessCard.location = location;
      businessCard.priceRange = priceRange;

      // Update the database with the modified businessCard JSON
      connection.query(
        'UPDATE businesses SET businessCard = ? WHERE business_id = ?', 
        [JSON.stringify(businessCard), businessId], 
        (err) => {
          if (err) {
            console.error('Error updating business card details:', err);
            return res.status(500).json({ success: false, message: 'Failed to update business card details' });
          }

          return res.json({
            success: true,
            message: 'Business details updated successfully',
            updatedDetails: { description, location, priceRange },
          });
        }
      );
    }
  );
});

//Para sa pag display ng accomodations
// Endpoint to fetch accomodations
app.get('/accomodations', (req, res) => {
  const sql = `
    SELECT * FROM accomodations
  `;
  
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of accomodations as the response
    return res.json({ success: true, accomodations: results });
  });
});

//Para sa pag display ng foods
// Endpoint to fetch foods
app.get('/foods', (req, res) => {
  const sql = `
    SELECT * FROM foods
  `;
  
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of foods as the response
    return res.json({ success: true, foods: results });
  });
});

//para sa pag display ng mga rooms
//Endpoint to fetch rooms
app.get('/rooms', (req, res) => {
  const sql = `
    SELECT * FROM rooms
  `;
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of rooms as the response
    return res.json({ success: true, rooms: results });
  });
});

//para sa pag display ng mga activities
//Endpoint to fetch activities
app.get('/activities', (req, res) => {
  const sql = `
    SELECT * FROM activities
  `;
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of activities as the response
    return res.json({ success: true, activities: results });
  });
});

//para sa pag display ng mga amenities
//Endpoint to fetch amenities
app.get('/amenities', (req, res) => {
  const sql = `
    SELECT * FROM amenities
  `;
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of amenities as the response
    return res.json({ success: true, amenities: results });
  });
});

//para sa pag display ng mga deals
//Endpoint to fetch deals
app.get('/deals', (req, res) => {
  const sql = `
    SELECT * FROM deals
  `;
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of deals as the response
    return res.json({ success: true, deals: results });
  });
});

//para sa pag display ng mga products
//Endpoint to fetch products
app.get('/products', (req, res) => {
  const sql = `
    SELECT * FROM products
  `;
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of products as the response
    return res.json({ success: true, products: results });
  });
});

//para sa pag display ng mga location
//Endpoint to fetch locations
app.get('/locations', (req, res) => {
  const sql = `
    SELECT * FROM locations
  `;
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of locations as the response
    return res.json({ success: true, locations: results });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));