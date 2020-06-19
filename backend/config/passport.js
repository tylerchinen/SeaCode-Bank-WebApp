const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username })
        .then((user) => {
          // Find user
          if (!user) {
            console.log(`${username} failed to login`);
            return done(null, false, { message: "Unable to find user" });
          }

          // Compare password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user, {message: "Authenticated"});
            } else {
              return done(null, false, {message: 'Incorrect password'});
            }
          });
        })
        .catch((err) => console.log(err));
    }),
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
