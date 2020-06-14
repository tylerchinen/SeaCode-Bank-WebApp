const User = require('../models/user');

const users = [
  new User({
    username: 'test',
    password: 'testPass',
    email: 'test@gmail.com',
  }),
];

module.exports = users;
