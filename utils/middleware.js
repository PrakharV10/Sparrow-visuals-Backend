const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

function authVerify(req, res, next) {
	const token = req.headers.authorization;
	try {
		const decode = jwt.verify(token, secret);
		req.user = { userId: decode.userId };
		return next();
	} catch (err) {
		console.log(err);
		return res.json({ success: false, message: 'authorization failed.' });
	}
}

module.exports = { authVerify };
