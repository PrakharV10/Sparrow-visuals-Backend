const bcrypt = require('bcrypt');
const { User } = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const mySecret = process.env['SECRET'];

async function registerNewUserAndToken(req, res) {
	const { username, password, email } = req.body;
	console.log('New user entry :', { username, password, email });
	try {
		// Hash password & Save
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();

		// create new token for user
		const token = jwt.sign({ userId: savedUser._id }, mySecret);

		// send token & success as response
		res.json({ success: true, token, data: savedUser });
	} catch (err) {
		console.log(err);
		res.json({ success: false, mesaage: err._message });
	}
}

module.exports = { registerNewUserAndToken };
