const mongoose = require('mongoose');
const { Note } = require('../Models/note.model');
const { extend } = require('lodash');

async function getNotesByUserId(req, res) {
	const { userId } = req.user;
	try {
		const response = await Note.find({ userId });
		res.json({ success: true, data: response });
	} catch (err) {
		res.json({ success: false, message: 'User notes not found' });
	}
}

async function createNotesForVideo(req, res) {
	const { userId } = req.user;
	const { note, videoId } = req.body;

	let noteOfCurrentVideo = await Note.findOne({ userId, videoId });

	if (noteOfCurrentVideo) {
		// Adding to note object, if already exists
		const updatedNotesOfCurrentVideo = noteOfCurrentVideo.texts.push(note);
		noteOfCurrentVideo = extend(noteOfCurrentVideo, updatedNotesOfCurrentVideo);

		try {
			const updatedNote = await noteOfCurrentVideo.save();
			res.json({ success: true, data: updatedNote });
		} catch (err) {
			res.json({ success: false, message: err.message });
		}
	} else {
		// Creating a new note object, if it doesn't exist
		const newNote = new Note({
			userId,
			videoId,
			texts: [note],
		});

		try {
			const savedNote = await newNote.save();
			res.json({ success: true, data: savedNote });
		} catch (err) {
			res.json({ success: false, message: err.message });
		}
	}
}

async function deleteNote(req, res) {
	const { userId } = req.user;
	const { videoId, note } = req.body;

	let currentNote = await Note.findOne({ userId, videoId });
	currentNote.texts.pull(note);
	try {
		await currentNote.save();
		res.json({ success: true });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

module.exports = { getNotesByUserId, createNotesForVideo, deleteNote };
