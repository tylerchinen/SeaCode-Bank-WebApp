const express = require('express');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const roles = require('../config/roleEnum');
const passport = require('passport');
const paginate = require('express-paginate');

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
  body(['firstname', 'lastname']).notEmpty().bail().isString(),
    body('accountnum').notEmpty().bail().isDecimal(),
    body('email').notEmpty().bail().isString().isEmail(),
    body('password').notEmpty().bail().isString(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { firstname, lastname, accountnum, email, password} = req.body;

  // Password doesn't matches, commented out due to frontend
  // if (password !== confirmPassword) {
  //   return res.status(400).json({ msg: 'Error: Password doesn\'t match'});
  // }

  // This runs async, so any return after this function run before the return inside.
  User.findOne({ email: email })
    .then((query) => {
      if (query) {
        return res.status(400).json({ msg: 'Error: Duplicate email'});
      } else {
        const newUser = new User({
          firstname: firstname,
          lastname: lastname,
          accountnum: accountnum,
          email: email,
          password: password,
          role: roles.user,
          balance: 0,
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

        console.log(`Created user: ${email}`);
        return res.status(201).send({
          msg: `Created user: ${email}`});
      }
    })
    .catch((err) => console.log('Error: ' + err));
  }
);

/*
LOG IN
 */
router.post('/login', passport.authenticate('local', { session: true }), (req, res, next) => {
  console.log(req.user.email + ' logged in');
  return res.status(200).send({msg: "Authenticated"});
});

/*
LOG OUT
 */
router.get('/logout', function(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user.email + ' logged out');
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
    console.log(req.user.email + ' requests authentication status: ' + req.isAuthenticated());
    return res.status(200).send({
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      msg: "User is logged in",
    });
  }

  return res.status(401).send({msg: "User is not logged in"});
});

router.get('/adminstatus', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user.email + ' is requesting admin status');
    User.findOne({ email: req.user.email })
      .then(
        (query) => {
          console.log('Query of ' + req.user.email + ' has status of: ' + query.role);
          if (!query) {
            return res.status(401).send({msg: "Unable to find user"});
          }

          const adminStatus = (query.role === roles.admin) ? true : false;
          return res.status(200).send({
            email: req.user.email,
            adminStatus: adminStatus
          });
        }
      )
      .catch(
        (err) => {
          console.log('Error: ' + err);
          return res.status(500).send({msg: "Error: Internal server error"});
        }
      );
  } else {
    return res.status(401).send({msg: "Unauthorized"});
  }
});

router.use('/protected', function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user.email + ' is accessing a protected resource');
    next();
  } else {
    console.log('Unauthorized user at '+ req.ip + ' tried to access protected resource');
    return res.status(401).send({msg: "Not logged in"});
  }
});

router.get('/protected/balance',
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({ email: req.user.email})
      .then((user => {
        if (!user) {
          return res.status(401).send({msg: "Error: Not logged in"});
        }

        console.log(user.email + ' accessed their balance');

        return res.status(200).send({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          balance: user.balance,
        });
      }))
      .catch((err) => {
        console.log('Error: ' + err);
        return res.status(500).end();
      });
});

router.post('/protected/wire', [
  body('secondPartyEmail').notEmpty().isEmail(),
  body('amount').notEmpty().isNumeric(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({ email: req.user.email})
    .then((user) => {
      if (!user) {
        return res.status(401).send({msg: "Error: Not logged in"});
      }

      User.wire(user, req.body.secondPartyEmail, req.body.amount, { logThis: true }, (state) =>{
        switch(state) {
          case -3:
            console.log('Wire error with code: ' + state);
            return res.status(400).send({msg: "Error: Amount above restricted limit"});
            break;
          case -2:
            console.log('Wire error with code: ' + state);
            return res.status(400).send({msg: "Error: Insufficient Fund"});
            break;
          case -1:
            console.log('Wire error with code: ' + state);
            return res.status(400).send({msg: "Error: Invalid Email"});
            break;
          case 0:
            return res.status(200).send({msg: "Transfered"});
        }
      });
      }
    )
    .catch((err) => {
      console.log('Error: ' + err);
      return res.status(500).end();
    });
});

router.post('/protected/deposit', [
    body('amount').notEmpty().isNumeric(),
  ], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({ email: req.user.email})
    .then((user) => {
      if (!user) {
        return res.status(401).send({msg: "Error: Not logged in"});
      }

      user.deposit(req.body.amount, { logThis: true }, (state) => {
        if (state) {
          return res.status(200).send({msg: `Deposited ${req.body.amount}`});
        } else {
          return res.status(400).send({msg: `Error: Invalid amount of ${req.body.amount}`});
        }
      });
    })
    .catch((err) => {
      console.log('Error: ' + err);
      return res.status(500).end();
    });
});

router.post('/protected/withdraw', [
  body('amount').notEmpty().isNumeric(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({ email: req.user.email})
    .then((user) => {
      if (!user) {
        return res.status(401).send({msg: "Error: Not logged in"});
      }

      user.withdraw(req.body.amount, {logThis: true}, (state) => {
        if (state) {
          return res.status(200).send({msg: `Withdrew ${req.body.amount}`});
        } else {
          return res.status(400).send({msg: `Error: Insufficient amount of ${req.body.amount}`});
        }
      });
    })
    .catch((err) => {
      console.log('Error: ' + err);
      return res.status(500).end();
    });
});

router.post('/protected/transactionHistory', [
  body('currentPage').notEmpty().isNumeric(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // assuming that currentPage starts at 1
  if (req.body.currentPage < 1) {
    return res.status(400).json({ errors: 'Current page is less than 1' });
  }

  User.findOne({ email: req.user.email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({msg: "Error: Not logged in"});
      }

      const indextAtZero = req.body.currentPage - 1;
      const limit = 7;
      const pageCount = Math.ceil((user.transactionHistory.length / limit));
      const hasMore = req.body.currentPage < pageCount;
      // assuming that currentPage starts at 1
      if (req.body.currentPage > pageCount) {
        return res.status(400).json({
          errors: 'Current page is above the the total page',
          hasMore: hasMore,
          totalPage: pageCount,
        });
      }
      const skip = (parseInt(indextAtZero) * limit);
      const offset = ((parseInt(indextAtZero) + 1) * limit);

      const paginatedHistory = user.transactionHistory.slice(skip, offset);

      console.log(user.email + ' accessed their transaction history');
      // console.log(user.transactionHistory.length);
      // console.log('Total page: ' + pageCount + ' Has more: ' + hasMore + ' From-To: ' + skip + ' - ' + offset);

      return res.status(200).send({
        email: user.email,
        hasMore: hasMore,
        totalPage: pageCount,
        transactionHistory: paginatedHistory,
      });
    })
    .catch((err) => {
      console.log('Error: ' + err);
      return res.status(500).end();
    });
});

module.exports = router;
