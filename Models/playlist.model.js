const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	playlistName: {
		type: String,
		required: 'Playlist Name is Required',
	},
	videos: [
		{
			type: Schema.Types.Mixed,
			ref: 'Video',
		},
	],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist };
