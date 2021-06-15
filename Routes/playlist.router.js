const express = require('express');
const router = express.Router();
const { authVerify } = require('../utils/middleware');
const {
	getPopulatedPlaylistByuserId,
	createPlaylist,
	deletePlaylist,
	getPlaylistFromParam,
	getVideosOfPlaylist,
	addVideosToPlaylist,
	deleteVideosFromPlaylist,
} = require('../controllers/playlist.controller');

router.use(authVerify);

router.route('/').get(getPopulatedPlaylistByuserId).post(createPlaylist).delete(deletePlaylist);

router.param('playlistId', getPlaylistFromParam);

router
	.route('/:playlistId')
	.get(getVideosOfPlaylist)
	.post(addVideosToPlaylist)
	.delete(deleteVideosFromPlaylist);

module.exports = router;
