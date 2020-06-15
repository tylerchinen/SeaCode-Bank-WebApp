const express = require('express');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

const saltRounds = 10;

router.get('/', (req, res, next) => {
  res.status(200).json(
    {
      msg: 'hello',
      array: ['test', 'test2'],
    },
  );
  next();
});

/*
Account registration route. Checks for:
- empty fields
- valid email
- fields are string
- two password matches
 */
router.post('/register', [
  body('username').notEmpty().bail().isString(),
  body(['password', 'confirmPassword']).notEmpty().bail().isString(),
  body('email').notEmpty().bail().isString().isEmail(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { username, password, confirmPassword, email} = req.body;

  // Password doesn't matches
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: 'Error: Password doesn\'t match'});
  }

  // This runs async, so any return after this function run before the return inside.
  User.findOne({ username: username })
    .then((query) => {
      if (query) {
        return res.status(422).json({ msg: 'Error: Duplicate username'});
      } else {
        const newUser = new User({
          username: username,
          password: password,
          email: email,
        });

        bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
          if (err) {
            console.log('Error: Hashing Error');
            throw err;
          }

          newUser.password = hash;

          newUser.save((err) => {
            if (err) {
              console.log('Error: Unable to save new user');
              return res.status(422).json({ msg: 'Error: Server error'});
            }
          });
        });

        console.log(`Created user: ${username}`);
        return res.status(201).send({
          msg: `Created user: ${username}`});
      }
    })
    .catch((err) => console.log(err));
  }
);

module.exports = router;
