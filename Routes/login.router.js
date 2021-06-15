const express = require('express');
const router = express.Router();
const { validateEmailAndPassword } = require('../controllers/login.controller');

router.route('/').post(validateEmailAndPassword);

module.exports = router;
