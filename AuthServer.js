require("dotenv").config();

class AuthServer {
	constructor() {
		console.log("Connected to Auth Server");
	}
	authenticate(user, password, callback = () => {}) {
		if (
			user !== process.env.ADMIN_USER ||
			password !== process.env.ADMIN_PASSWORD
		) {
			callback(null);
		} else callback(process.env.FAKE_TOKEN);
	}
}

module.exports = new AuthServer();
