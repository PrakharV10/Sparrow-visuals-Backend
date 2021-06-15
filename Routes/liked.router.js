const express = require('express');
const router = express.Router();
const { authVerify } = require('../utils/middleware');
const {
	getLikedVideosByUserId,
	addLikedVideos,
	deleteFromLikedVideos,
} = require('../controllers/liked.controller');

router.use(authVerify);

router.route('/').get(getLikedVideosByUserId).post(addLikedVideos).delete(deleteFromLikedVideos);

module.exports = router;
