const express = require('express');
const router = express.Router();
const { authVerify } = require('../utils/middleware');
const {
	getNotesByUserId,
	createNotesForVideo,
	deleteNote,
} = require('../controllers/notes.controller');

router.use(authVerify);

router.get('/', getNotesByUserId);
router.post('/', createNotesForVideo);
router.delete('/', deleteNote);

module.exports = router;
