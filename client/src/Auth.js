class Auth {
	constructor() {
		this.retrieveFromLocalStorage();
	}
	login(user, password, callback = () => {}) {
		let token;
		fetch("/api/token", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ user, password })
		})
			.then(res => res.json())
			.then(resJSON => {
				token = resJSON.token;
				if (token !== null) {
					this.username = user;
					this.token = token;
					this.isAuthenticated = true;
					this.saveToLocalStorage();
				} else this.logoff();
				return this.isAuthenticated;
			})
			.then(callback);
	}
	logoff() {
		this.username = null;
		this.token = null;
		this.isAuthenticated = false;
		localStorage.removeItem("user_data");
	}
	retrieveFromLocalStorage() {
		let jsonData = localStorage.getItem("user_data");
		if (jsonData !== null) {
			let userData = JSON.parse(jsonData);
			this.username = userData["username"];
			this.token = userData["token"];
			this.isAuthenticated = true;
		} else {
			this.username = null;
			this.token = null;
			this.isAuthenticated = null;
		}
	}
	saveToLocalStorage() {
		localStorage.setItem(
			"user_data",
			JSON.stringify({ username: this.username, token: this.token })
		);
	}
}

export default new Auth();
