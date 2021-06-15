async function checkPasswordIsRight(passwordFromClient) {
	try {
		const isMatch = await bcrypt.compare(passwordFromClient, originalPassword);

		console.log('Password Matched');
		return isMatch;
	} catch (err) {
		res.json({ success: false, message: 'Error checking Password' });
	}
}

module.exports = { checkPasswordIsRight };
