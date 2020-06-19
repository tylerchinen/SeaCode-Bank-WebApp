const express = require('express');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const roles = require('../config/roleEnum');
const passport = require('passport');

const router = express.Router();

const saltRounds = 10;

router.get('/', (req, res, next) => {
  res.status(200).json(
    {
      msg: 'Users API online',
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

When the input is valid, creates the user in the User model
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
    return res.status(400).json({ msg: 'Error: Password doesn\'t match'});
  }

  // This runs async, so any return after this function run before the return inside.
  User.findOne({ username: username })
    .then((query) => {
      if (query) {
        return res.status(400).json({ msg: 'Error: Duplicate username'});
      } else {
        const newUser = new User({
          username: username,
          password: password,
          email: email,
          role: roles.user,
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
              return res.status(500).json({ msg: 'Error: Server error'});
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

/*
LOG IN
 */
router.post('/login', passport.authenticate('local', { session: true }), (req, res, next) => {
  console.log(req.user.username + ' logged in');
  return res.status(200).send({msg: "Authenticated"});
});

/*
LOG OUT
 */
router.get('/logout', function(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user.username + ' logged out');
  }
  req.logout();
  return res.status(200).send({msg: "Logged out"});

  return res.status(400).send({msg: "Error: Unforseen error"});
});

/*
SESSION CHECK
 */
router.get('/sessioncheck', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user.username + ' requests authentication status: ' + req.isAuthenticated());
    return res.status(200).send({msg: "User is logged in"});
  }

  return res.status(401).send({msg: "User is not logged in"});
});

router.get('/adminstatus', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user.username + ' is requesting admin status');
    User.findOne({ username: req.user.username })
      .then(
        (query) => {
          console.log('Query of ' + req.user.username + 'has status of: ' + query);
          if (!query) {
            return res.status(401).send({msg: "Unable to find user"});
          }

          const adminStatus = (query.role === roles.admin) ? true : false;
          return res.status(200).send({adminStatus: adminStatus});
        }
      )
      .catch(
        (err) => {
          console.log(err);
          return res.status(500).send({msg: "Error: Internal server error"});
        }
      );
  } else {
    return res.status(401).send({msg: "Unauthorized"});
  }
});

module.exports = router;
