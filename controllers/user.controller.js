const express = require('express');
const { User } = require('../Models/user.model');
const bcrypt = require('bcrypt');

async function getUserById(req, res) {
	const { userId } = req.user;

	try {
		const currentUser = await User.findOne({ _id: userId });
		res.json({ success: true, data: currentUser });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

async function changeUsernameAndEmail(req, res) {
	const { userId } = req.user;
	const { username, email } = req.body;

	try {
		const currentUser = await User.findOne({ _id: userId });
		currentUser.username = username;
		currentUser.email = email;

		const updatedUser = await currentUser.save();
		res.json({ success: true, data: updatedUser });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

async function changePassword(req, res) {
	const { userId } = req.user;
	const { oldPassword, newPassword } = req.body;

	try {
		const currentUser = await User.findOne({ _id: userId });

		const match = await bcrypt.compare(oldPassword, currentUser.password);

		if (match) {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			currentUser.password = hashedPassword;
			const updatedUser = await currentUser.save();
			res.json({ success: true, data: updatedUser });
		} else {
			res.json({ success: false, message: "password doesn't match. Try again" });
		}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
}

module.exports = { getUserById, changeUsernameAndEmail, changePassword };
