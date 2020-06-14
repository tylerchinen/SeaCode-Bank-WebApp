const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// CONFIG
const startup = require('./config/startup');

// ROUTES
const userRoute = require('./routes/user');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MONGO
const devURI = 'mongodb://localhost:27017/mydb';
const uri = process.env.ATLAS_URI;
mongoose.connect(devURI, { useNewUrlParser: true, useCreateIndex: true });

/* es lint asks for destructuring here, remove comment as necessary */
const connection = mongoose.connection; // eslint-disable-line

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Seed database if there's no user
startup();

// ROUTING
app.use('/api/users', userRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
