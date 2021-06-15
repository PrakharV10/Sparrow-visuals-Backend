const mongoose = require('mongoose');

const uri = `mongodb+srv://prakharvarshney:fantastic10@sparrow-cluster.7brzk.mongodb.net/sparrow-visuals?retryWrites=true&w=majority`;

async function connectDb() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log('Connection Successfully Established.');
	} catch (err) {
		console.log('Error Establishing Connection :', err);
	}
}

module.exports = { connectDb };
