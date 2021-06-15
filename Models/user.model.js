const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: 'Username is required',
			minLength: [4, 'Username should be atleast 4 characters long'],
		},
		email: {
			type: String,
			required: 'Email is required for signup',
			unique: true,
		},
		password: {
			type: String,
			required: 'Password is required',
		},
		likedVideos: [
			{
				type: Schema.Types.Mixed,
				ref: 'Video',
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
