const User = require('../models/user');
const roles = require('./roleEnum');

const users = [
  new User({
    username: 'john',
    password: '$2b$10$yDmQF9vJfqmjdsl9TaBHIewpnjck1vId/avmLHrHp6vmPJbSlH3xW',
    email: 'john@gmail.com',
    role: roles.user,
  }),
  new User({
    username: 'admin',
    password: '$2b$10$mQEgoJElbxPapmPx7HJFXexu9Ogko.qtecDr/IUaCxoFB56k//Y3m',
    email: 'test@gmail.com',
    role: roles.admin,
  }),
];

module.exports = users;
