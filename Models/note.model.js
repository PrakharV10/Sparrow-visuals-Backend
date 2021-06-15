const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
	userId: {
		required: 'userId is required',
		type: String,
	},
	videoId: {
		required: 'videoId is required',
		type: String,
	},
	texts: { type: Array, default: [] },
});

const Note = mongoose.model('Note', notesSchema);

module.exports = { Note };
