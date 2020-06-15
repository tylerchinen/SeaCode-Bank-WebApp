const User = require('../models/user');
const roles = require('./roleEnum');

const users = [
  new User({
    username: 'john',
    password: '$2b$10$yDmQF9vJfqmjdsl9TaBHIewpnjck1vId/avmLHrHp6vmPJbSlH3xW',
    email: 'john@gmail.com',
    role: roles.user,
  }),
];

module.exports = users;
