const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'shivansh4011@gmail.com',
		subject: 'Thanks for joining in!',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
	});
};

const sendCancelationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'shivansh4011@gmail.com',
		subject: 'GoodBye',
		text: `Bye ${name}. Please tell us the reason of your leaving.`
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail
};
