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
		2: ["Emily Leopard Print Rescue Center"],
		3: ["Steve's Cheesecake Factory"],
		4: ["Louis Sourdough Bros'"],
		5: ["Phil Filtered Coffee"],
		6: ["Martina's Cat Sanctuary"]
	},
	team_packages: {
		lastId: 10,
		columns: ["package_id", "team_id", "start_date", "end_date"],
		1: [1, 1, "2018-01-05", "2018-05-31"],
		2: [2, 2, "2018-05-21", null],
		3: [3, 3, "2017-05-06", "2018-06-30"],
		4: [3, 2, "2018-01-05", null],
		6: [4, 1, "2018-07-07", null],
		7: [3, 5, "2018-07-03", null],
		8: [2, 3, "2019-05-20", null],
		9: [2, 3, "2019-06-16", null],
		10: [2, 3, "2018-06-16", null]
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
					team_name: teams[id][0],
					can_hand_in_notice: this.canTeamHandInNotice(id)
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
		let activePackages = teamPackagesList.filter(teamPackage => {
			if (teamPackage["end_date"] === null) return true;
			let endDate = new Date(teamPackage["end_date"]);
			let now = new Date();
			return endDate > now;
		});

		for (let activePackage of activePackages) {
			activePackage["can_cancel"] = this.canCancelActivePackage(
				activePackage.id
			);
		}

		return activePackages;
	}
	canCancelActivePackage(activePackageId) {
		let activePackageData = this.data.team_packages[activePackageId];
		let packageData = this.data.packages[activePackageData[0]];

		if (packageData[2] === "flexi") return false;
		if (activePackageData[3] !== null) return false;

		let now = new Date();
		let startDate = new Date(activePackageData[2]);
		let startYear = startDate.getFullYear();
		let startMonth = startDate.getMonth();
		let commitmentPeriod = packageData[4];
		let commitmentMonth = (startMonth + commitmentPeriod) % 12;
		let commitmentYear =
			startYear + Math.floor((startMonth + commitmentPeriod) / 11);
		let commitmentDate = new Date(commitmentYear, commitmentMonth, 1);

		if (commitmentDate > now) return false;
		return true;
	}
	cancelPackage(activePackageId) {
		let activePackageData = this.data.team_packages[activePackageId];
		let packageData = this.data.packages[activePackageData[0]];

		let now = new Date();
		let nowYear = now.getFullYear();
		let nowMonth = now.getMonth();

		let cancellationPeriod = packageData[3] - 1;
		let cancellationMonth = (nowMonth + cancellationPeriod) % 12;
		let cancellationYear =
			nowYear + Math.floor((nowMonth + cancellationPeriod) / 11);
		let endDate = new Date(
			cancellationYear,
			cancellationMonth,
			new Date(cancellationYear, (cancellationMonth + 1) % 11, 0).getDate()
		);

		activePackageData[3] = endDate.toISOString().slice(0, 10);
	}
	canTeamHandInNotice(teamId) {
		let teamName = this.data.teams[teamId][0];
		let teamActivePackageList = this.getActivePackagesList().filter(
			activePackage => activePackage["team_name"] === teamName
		);
		if (teamActivePackageList.length === 0) return false;

		if (
			!teamActivePackageList.every(teamActivePackage =>
				this.canCancelActivePackage(teamActivePackage.id)
			)
		)
			return false;

		return true;
	}
	handInNoticeFromTeam(teamId) {
		let teamName = this.data.teams[teamId][0];
		let teamActivePackageList = this.getActivePackagesList().filter(
			activePackage => activePackage["team_name"] === teamName
		);

		for (let teamActivePackage of teamActivePackageList) {
			this.cancelPackage(teamActivePackage.id);
		}
	}
}

module.exports = new DataBase();
