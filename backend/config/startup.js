const userDB = require('../models/user');
const data = require('./seedData');

/*
Detect if there's any user in the database. If not, add users from seedData.
 */
const seedUser = () => {
  userDB.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        console.log('No users detected, seeding data');

        data.forEach((doc) => {
          doc.save();
          console.log(`Adding ${doc.username}`);
        });
      }
      console.log('Done');
    })
    .catch((err) => console.log(err));
};

module.exports = seedUser;
