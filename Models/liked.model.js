const mongoose = require('mongoose');
const { Schema } = mongoose;

const likedVideoSchema = new Schema({
	videos: [
		{
			ref: 'Video',
			type: Schema.Types.Mixed,
		},
	],
	userId: {
		type: String,
		required: true,
	},
});

const LikedVideo = mongoose.model('LikedVideo', likedVideoSchema);

module.exports = { LikedVideo };
