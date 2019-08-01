let data = {
	packages: {
		lastId: 4,
		columns: [
			"name",
			"description",
			"desk_type",
			"cancellation_period",
			"commitment_period",
			"price",
			"mr_credits",
			"days",
			"sell_limit"
		],
		1: [
			"Hotdesk",
			"A hotdesk package with 10 days",
			"flexi",
			1,
			1,
			30.0,
			10,
			10,
			5
		],
		2: [
			"Dedicated",
			"A dedicated package",
			"dedicated",
			2,
			3,
			150.0,
			30,
			0,
			null
		],
		3: [
			"Office Desk",
			"An office desk package",
			"office",
			3,
			3,
			300.0,
			50,
			0,
			10
		],
		4: [
			"Unlimited",
			"An unlimited package",
			"unlimited",
			1,
			1,
			60.0,
			10,
			0,
			null
		]
	},
	teams: {
		lastId: 6,
		columns: ["team_name"],
		1: ["Joe Vape-A-Lot Vape Shop"],
		2: ["Emily Leopard Print Rescure Center"],
		3: ["Steve's Cheesecake Factory"],
		4: ["Louis Sourdough Bros'"],
		5: ["Phil Filtered Coffee"],
		6: ["Martina's Cat Sanctuary"]
	},
	team_packages: {
		lastId: 7,
		columns: ["package_id", "team_id", "start_date", "end_date"],
		1: [1, 1, "2018-01-05", "2018-05-31"],
		2: [2, 2, "2018-05-21", null],
		3: [3, 3, "2017-05-06", "2018-06-30"],
		4: [3, 2, "2018-01-05", null],
		6: [4, 1, "2018-07-07", null],
		7: [3, 5, "2018-07-03", null]
	}
};

class DataBase {
	constructor() {
		this.data = data;
	}
	getPackagesList() {
		let packages = this.data.packages;
		let packagesList = [];
		for (let id = 1; id <= packages.lastId; id++) {
			if (packages[id] !== undefined)
				packagesList.push({
					id,
					name: packages[id][0],
					description: packages[id][1],
					desk_type: packages[id][2],
					cancellation_period: packages[id][3],
					commitment_period: packages[id][4],
					price: packages[id][5],
					mr_credits: packages[id][6],
					days: packages[id][7],
					sell_limit: packages[id][8]
				});
		}
		return packagesList;
	}
	getTeamsList() {
		let teams = this.data.teams;
		let teamsList = [];
		for (let id = 1; id <= teams.lastId; id++) {
			if (teams[id] !== undefined)
				teamsList.push({
					id,
					team_name: teams[id][0]
				});
		}
		return teamsList;
	}
	getTeamPackagesList() {
		let teamPackages = this.data.team_packages;
		let teamPackagesList = [];
		for (let id = 1; id <= teamPackages.lastId; id++) {
			if (teamPackages[id] !== undefined)
				teamPackagesList.push({
					id,
					package_name: this.data.packages[teamPackages[id][0]][0],
					team_name: this.data.teams[teamPackages[id][1]][0],
					start_date: teamPackages[id][2],
					end_date: teamPackages[id][3]
				});
		}
		return teamPackagesList;
	}
	getActivePackagesList() {
		let teamPackagesList = this.getTeamPackagesList();
		return teamPackagesList.filter(teamPackage => {
			if (teamPackage["end_date"] === null) return true;
			let endDate = new Date(teamPackage["end_date"]);
			let now = new Date();
			return endDate > now;
		});
	}
}

module.exports = new DataBase();
