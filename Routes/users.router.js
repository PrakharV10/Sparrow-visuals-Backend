const express = require('express');
const router = express.Router();
const { authVerify } = require('../utils/middleware');
const {
	getUserById,
	changeUsernameAndEmail,
	changePassword,
} = require('../controllers/user.controller');

router.use(authVerify);

router.route('/').get(getUserById).post(changeUsernameAndEmail).put(changePassword);

module.exports = router;
