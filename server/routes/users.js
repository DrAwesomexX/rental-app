const express = require('express');
const router = express.Router();
const User = require('../controllers/users.js');

router.post('/auth', User.auth);
router.post('/register', User.register);
module.exports = router;
