const mongoose = require('mongoose');
const { Schema } = mongoose;
const videoData = require('../Data/videoData');

const videoSchema = new Schema({
	_id: Schema.Types.Mixed,
	title: {
		type: String,
		required: 'Title of the video is required.',
	},
	category: {
		type: String,
		required: 'Category for the video is required.',
	},
	url: {
		type: String,
		required: 'End point of the course, it belongs to',
	},
	thumbnail: {
		type: String,
		required: 'Image of the Youtube Video is required.',
	},
	channelName: {
		type: String,
		required: 'Name of the Youtube Channel is required',
	},
	channelImage: {
		type: String,
		required: 'Avatar of the channel is required',
	},
	description: {
		type: String,
		required: 'Description of the video is required.',
	},
});

const Video = mongoose.model('Video', videoSchema);

async function addVideoToDB() {
	try {
		videoData.forEach(async (one) => {
			const NewVideo = new Video(one);
			const savedVideo = await NewVideo.save();
			console.log(savedVideo);
		});
	} catch (err) {
		console.log('Error Uploading Videos :', err);
	}
}

module.exports = { Video, addVideoToDB };
