const mongoose = require('mongoose');

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  accountnum: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  ssn: String,
  bankAccountNumber: String,
  creditCardNumber: Number,
  transactionHistory: Array,
});

UserSchema.methods.deposit = function (amount) {
  this.balance = parseFloat(this.balance) + parseFloat(amount);
  return true;
};

UserSchema.methods.withdraw = function (amount) {
  if (this.balance < amount) {
    return false;
  }

  this.balance = parseFloat(this.balance) - parseFloat(amount);
  return true;
};

UserSchema.statics.wire = function (user, accountnum2, amount, callback) {
  this.findOne({ accountnum: accountnum2 })
    .then((user2) => {
      if (!user2) {
        console.log('Transfer error between ' + user.accountnum + ' and unknown account: ' + accountnum2);
        return callback(-1);
      }
      if (user2.accountnum === user.accountnum) {
        console.log('Self-Transfer error between ' + user.accountnum + ' and ' + accountnum2);
        return callback(-1);
      }
      if (!user.withdraw(amount)) {
        console.log('Transfer error between ' + user.accountnum + ' and ' + accountnum2);
        return callback(-2);
      }
      user2.deposit(amount);

      user.save();
      user2.save();
      console.log('Account: ' + user.accountnum + ' transfer $' + amount + ' to Account: ' + accountnum2);
      return callback(0);
    })
    .catch((err) => {
      console.log(err);
      if (err) throw err;
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;