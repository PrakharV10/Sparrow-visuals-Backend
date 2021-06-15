const { User } = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mySecret = process.env['SECRET'];

async function validateEmailAndPassword(req, res) {
	const { email, password } = req.body;
	try {
		const currentUser = await User.findOne({ email });

		// Check if password matches.
		const match = await bcrypt.compare(password, currentUser.password);

		if (match) {
			// Create new token for user
			const token = jwt.sign({ userId: currentUser._id }, mySecret);

			// Send token, user & success as response
			res.json({ success: true, token, data: currentUser });
		} else {
			res.json({ success: false, message: "Your password doesn't match" });
		}
	} catch (err) {
		console.log(err);
		res.json({ success: false, message: 'Some error Occured' });
	}
}

module.exports = { validateEmailAndPassword };
