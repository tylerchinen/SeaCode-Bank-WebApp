const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();

// CONFIGS
const startup = require('./config/startup');
const secrets = require('./config/secrets');
// PASSPORT CONFIG
require('./config/passport')(passport);
// ROUTES
const userRoute = require('./routes/user');

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MONGO CONNECTION
const devURI = 'mongodb://localhost:27017/mydb'; // For local development
const uri = process.env.ATLAS_URI; // Change this back on commits
console.log(process.env.ATLAS_URI);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

/* es lint asks for destructuring here, remove comment as necessary */
const connection = mongoose.connection; // eslint-disable-line

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// SESSION
app.use(session({
  // if this line gives you trouble, make your own secrets.js file in ./config
  secret: secrets.sessionSecrets,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: 'true',
    expires: new Date(Date.now + 60 * 60 * 1000), // 1 hour
  },
}));

// PASPORT MIDDLEWARE
app.use(passport.initialize()); // sets up req.login()
app.use(passport.session());

// Seed database if there's no user
startup();

// ROUTING
app.use('/api/users', userRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
