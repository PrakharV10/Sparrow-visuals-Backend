const express = require('express');
const router = express.Router();
const { registerNewUserAndToken } = require('../controllers/signup.controller');

router.route('/').post(registerNewUserAndToken);

module.exports = router;
