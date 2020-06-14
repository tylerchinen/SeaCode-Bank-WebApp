const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json(
    {
      msg: 'hello',
      array: ['test', 'test2'],
    });
  next();
});



module.exports = router;
