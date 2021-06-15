const mongoose = require('mongoose');
const { Playlist } = require('../Models/playlist.model');

// @route /playlist
async function getPopulatedPlaylistByuserId(req, res) {
	const { userId } = req.user;

	try {
		const currentPlaylist = await Playlist.find({ userId });
		const populatedPromises = await currentPlaylist.map(async (one) =>
			one.populate('videos').execPopulate()
		);
		const populatedPlaylist = await Promise.all(populatedPromises);
		res.json({ success: true, data: populatedPlaylist });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

async function createPlaylist(req, res) {
	const { userId } = req.user;
	const { playlistName } = req.body;

	const newPlaylist = new Playlist({
		userId,
		playlistName,
		videos: [],
	});

	try {
		const playlistCreated = await newPlaylist.save();
		res.json({ success: true, data: playlistCreated });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

async function deletePlaylist(req, res) {
	const { userId } = req.user;
	const { playlistId } = req.body;

	try {
		const currentPlaylist = await Playlist.deleteOne({ _id: playlistId });
		res.json({ success: true, data: currentPlaylist });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

// @route /playlist/:playlistId
async function getPlaylistFromParam(req, res, next, playlistId) {
	const { userId } = req.user;

	try {
		const currentPlaylist = await Playlist.findOne({ userId, _id: playlistId });
		req.playlist = currentPlaylist;
	} catch (err) {
		return res.json({ success: false, message: err.message });
	}

	next();
}

// get video of particular playlist
async function getVideosOfPlaylist(req, res) {
	const currentPlaylist = req.playlist;
	try {
		const populatedPlaylist = await currentPlaylist.populate('videos').execPopulate();
		res.json({ success: true, data: currentPlaylist });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

// add videos to particular playlist
async function addVideosToPlaylist(req, res) {
	const currentPlaylist = req.playlist;
	const { videoId } = req.body;

	currentPlaylist.videos.push(videoId);
	try {
		const updatedPlaylist = await currentPlaylist.save();
		res.json({ success: true, data: updatedPlaylist });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

// delete vidoes from particular playlist
async function deleteVideosFromPlaylist(req, res) {
	const currentPlaylist = req.playlist;
	const { videoId } = req.body;

	currentPlaylist.videos.pull(videoId);
	try {
		const updatedPlaylist = await currentPlaylist.save();
		res.json({ success: true, data: updatedPlaylist });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

module.exports = {
	getPopulatedPlaylistByuserId,
	createPlaylist,
	deletePlaylist,
	getPlaylistFromParam,
	getVideosOfPlaylist,
	addVideosToPlaylist,
	deleteVideosFromPlaylist,
};
