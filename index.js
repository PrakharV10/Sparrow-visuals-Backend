const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

let { connectDb } = require('./Data/database');
let { addVideoToDB } = require('./Models/video.model.js');

// Routes
const users = require('./Routes/users.router.js');
const login = require('./Routes/login.router.js');
const signup = require('./Routes/signup.router.js');
const videos = require('./Routes/videos.router.js');
const notes = require('./Routes/notes.router.js');
const playlist = require('./Routes/playlist.router.js');
const likedVideos = require('./Routes/liked.router.js');

const app = express();
const corsOptions = {
	origin: 'https://sparrow-visuals.netlify.app',
	optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors());

connectDb();
/**
 * Will Run Once To Upload Videos to Database.
 * addVideoToDB();
 */

app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);
app.use('/videos', videos);
app.use('/notes', notes);
app.use('/playlist', playlist);
app.use('/liked', likedVideos);

app.get('/', (req, res) => {
	res.send('Hello Sparrow Visuals!!');
});

app.listen(3000, () => {
	console.log('server started');
});
