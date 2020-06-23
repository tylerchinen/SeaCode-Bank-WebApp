const mongoose = require('mongoose');
const roles = require('../config/roleEnum');
const { TransactionType, TransactionTo } = require('../config/transactionEnum');

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
  transactionHistory: [
    {
      transactionType: { type: String, required: true },
      recipient: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, required: true },
      from: { type: String, require: false },
    },
  ],
});

UserSchema.methods.deposit = function (amount, options, callback) {
  if (this.role !== roles.admin) {
    if (amount > roles.userAmount) {
      if (callback) callback(false);
      return false;
    }
  }

  this.balance = parseFloat(this.balance) + parseFloat(amount);

  if (options.logThis) {
    const transactionLog = {
      transactionType: TransactionType.deposit,
      recipient: TransactionTo.self,
      amount: amount,
      date: Date.now(),
    };

    this.transactionHistory.push(transactionLog);
    console.log(this.transactionHistory);
  }

  if (options.noSave) {
    if (callback) callback(true);
    return true;
  }

  this.save();
  if (callback) callback(true);
  return true;
};

UserSchema.methods.withdraw = function (amount, options, callback) {
  if (this.balance < amount) {
    if (callback) callback(false);
    return false;
  }
  if (this.balance <= 0) {
    if (callback) callback(false);
    return false;
  }

  this.balance = parseFloat(this.balance) - parseFloat(amount);

  if (options.logThis) {
    const transactionLog = {
      transactionType: TransactionType.withdraw,
      recipient: TransactionTo.self,
      amount: amount,
      date: Date.now(),
    };

    this.transactionHistory.push(transactionLog);
    console.log(this.transactionHistory);
  }

  if (options.noSave) {
    if (callback) callback(true);
    return true;
  }

  this.save();
  if (callback) callback(true);
  return true;
};

UserSchema.statics.wire = function (user, accountnum2, amount, options, callback) {
  this.findOne({ accountnum: accountnum2 })
    .then((user2) => {
      if (!user2) {
        console.log(`Transfer error between ${user.accountnum} and unknown account: ${accountnum2}`);
        return callback(-1);
      }
      if (user2.accountnum === user.accountnum) {
        console.log(`Self-Transfer error between ${user.accountnum} and ${accountnum2}`);
        return callback(-1);
      }
      if (!user.withdraw(amount, { noSave: true })) {
        console.log(`Transfer error between ${user.accountnum} and ${accountnum2}`);
        return callback(-2);
      }
      user2.deposit(amount, { noSave: true });

      if (options.logThis) {
        const transactionLogSender = {
          transactionType: TransactionType.wire,
          recipient: user2.accountnum,
          amount: amount,
          date: Date.now(),
          from: TransactionTo.self,
        };

        const transactionLogReceiver = {
          transactionType: TransactionType.wire,
          recipient: TransactionTo.self,
          amount: amount,
          date: Date.now(),
          from: user.accountnum,
        };

        user.transactionHistory.push(transactionLogSender);
        user2.transactionHistory.push(transactionLogReceiver);
        user.save();
        user2.save();
        console.log(user.transactionHistory);
      }

      console.log(`Account: ${user.accountnum} transfer $${amount} to Account: ${accountnum2}`);
      return callback(0);
    })
    .catch((err) => {
      console.log(err);
      if (err) throw err;
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
