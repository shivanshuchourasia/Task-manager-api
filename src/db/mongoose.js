const mongoose = require('mongoose');

let db;

if (process.env.NODE_ENV == 'test') {
	db = 'mongodb://127.0.0.1:27017/task-manager-api-test';
} else {
	db = 'mongodb://127.0.0.1:27017/task-manager-api';
}

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('MongoDB Connected...');
	});
