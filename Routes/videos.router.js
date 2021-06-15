const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Video } = require('../Models/video.model.js');

router.route('/').get(async (req, res) => {
	try {
		const dbResponse = await Video.find({});
		res.json({ success: true, data: dbResponse });
	} catch (err) {
		console.log('Error Fetching all Data: ', err);
		res.json({ success: false });
	}
});

module.exports = router;
