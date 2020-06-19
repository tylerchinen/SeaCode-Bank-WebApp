const mongoose = require('mongoose');

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  ssn: String,
  bankAccountNumber: String,
  creditCardNumber: Number,
  transactionHistory: Array,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
