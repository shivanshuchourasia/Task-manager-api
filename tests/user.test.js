const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'shivam',
			email: 'shivam@gmail.com',
			password: 'MyPass777!'
		})
		.expect(201);

	// Assert that the database is changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assertions about the response
	expect(response.body).toMatchObject({
		user: {
			name: 'shivam',
			email: 'shivam@gmail.com'
		},
		token: user.tokens[0].token
	});
	expect(user.password).not.toBe('MyPass777!');
});

test('Should login registered user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(response.body.token).toBe(user.tokens[1].token);
});

test("Shouldn't login registered user", async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: 'abc@gmail.com',
			password: 'abc123!!'
		})
		.expect(400);
});

test('Should show user profile', async () => {
	await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);
});

test("Shouldn't show profile for non-existing user", async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('Should delete loggedin user', async () => {
	await request(app).delete('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Shouldn\t delete user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);
	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'shivan'
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.name).toBe('shivan');
});

test('Should not update invalid data fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({ location: 'Noida' })
		.expect(400);
});
