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
}

export default DataBase;
