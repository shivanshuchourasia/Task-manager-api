const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Mike',
	email: 'mike@gmail.com',
	password: 'saywhat!!!',
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.TOKEN_KEY)
		}
	]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: 'rob',
	email: 'rob@gmail.com',
	password: 'hello!!!',
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, process.env.TOKEN_KEY)
		}
	]
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'First task',
	completed: false,
	owner: userOneId
};

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Second task',
	completed: true,
	owner: userOneId
};

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Third task',
	completed: false,
	owner: userTwoId
};

const setupDatabase = async () => {
	await User.deleteMany();
	await Task.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();
	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
};

module.exports = {
	userOneId,
	userTwoId,
	taskOne,
	taskTwo,
	taskThree,
	userOne,
	userTwo,
	setupDatabase
};
