const express = require('express');
const router = express.Router();
const Rental = require('../models/rental.js');
const UserCtrl = require('../controllers/users.js');
router.get('/secret', UserCtrl.authMiddleware, (req, res) => {
  res.json({
    secret: true
  });
});
router.get('', (req, res) => {
  Rental.find({}, (err, foundRentals) => {
    res.json(foundRentals);
  });
});

router.get('/:id', (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId, (err, foundRentals) => {
    if (err) {
      res.status(422).send({
        error: [{ title: 'Rental error!!', detail: 'could not found' }]
      });
    }
    res.json(foundRentals);
  });
});
module.exports = router;
