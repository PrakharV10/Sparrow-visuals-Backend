const mongoose = require('mongoose');
const { User } = require('../Models/user.model');

async function getLikedVideosByUserId(req, res) {
	const { userId } = req.user;

	try {
		const currentUser = await User.findOne({ _id: userId });
		const populatedLikedVideo = await currentUser.populate('likedVideos').execPopulate();
		res.json({ success: true, data: populatedLikedVideo.likedVideos });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

async function addLikedVideos(req, res) {
	const { userId } = req.user;
	const { videoId } = req.body;
	try {
		const currentUser = await User.findOne({ _id: userId });
		currentUser.likedVideos.push(videoId);
		const updatedUser = await currentUser.save();
		res.json({ success: true, likedVideo: updatedUser.likedVideos });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

async function deleteFromLikedVideos(req, res) {
	const { userId } = req.user;
	const { videoId } = req.body;
	try {
		let currentVideo = await User.findOneAndUpdate(
			{ _id: userId },
			{ $pull: { likedVideos: videoId } }
		);
		res.json({ success: true, data: currentVideo.likedVideos });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

module.exports = { getLikedVideosByUserId, addLikedVideos, deleteFromLikedVideos };
