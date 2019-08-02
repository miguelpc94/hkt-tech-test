class DataBase {
	constructor(auth) {
		this.auth = auth;
	}
	getPackages = (callback = () => {}) => {
		fetch(`/api/packages?token=${this.auth.token}`)
			.then(res => res.json())
			.then(packages => callback(packages));
	};
	getTeams = (callback = () => {}) => {
		fetch(`/api/teams?token=${this.auth.token}`)
			.then(res => res.json())
			.then(packages => callback(packages));
	};
	getActivePackages = (callback = () => {}) => {
		fetch(`/api/active-packages?token=${this.auth.token}`)
			.then(res => res.json())
			.then(packages => callback(packages));
	};
	cancelPackage(activePackageId, callback = () => {}) {
		fetch(`/api/cancel-active-package`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ activePackageId, token: this.auth.token })
		})
			.then(res => res.json())
			.then(resJSON => resJSON.message)
			.then(callback);
	}
	handInNotice(teamId, callback = () => {}) {
		fetch(`/api/hand-in-notice`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ teamId, token: this.auth.token })
		})
			.then(res => res.json())
			.then(resJSON => resJSON.message)
			.then(callback);
	}
}

export default DataBase;
