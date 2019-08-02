require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const authServer = require("./AuthServer");
const db = require("./libs/DataBase");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

app.get("/api/packages", (req, res) => {
	let token = req.query.token;
	if (token === process.env.FAKE_TOKEN) {
		res.json(db.getPackagesList());
		console.log(`Package data sent. Valid token: ${token}`);
	} else {
		res.json(null);
		console.log(`Package data denied. Invalid token: ${token}`);
	}
});

app.get("/api/teams", (req, res) => {
	let token = req.query.token;
	if (token === process.env.FAKE_TOKEN) {
		res.json(db.getTeamsList());
		console.log(`Teams data sent. Valid token: ${token}`);
	} else {
		res.json(null);
		console.log(`Teams data denied. Invalid token: ${token}`);
	}
});

app.get("/api/team-packages", (req, res) => {
	let token = req.query.token;
	if (token === process.env.FAKE_TOKEN) {
		res.json(db.getTeamPackagesList());
		console.log(`Team-Packages data sent. Valid token: ${token}`);
	} else {
		res.json(null);
		console.log(`Team-Packages data denied. Invalid token: ${token}`);
	}
});

app.get("/api/active-packages", (req, res) => {
	let token = req.query.token;
	if (token === process.env.FAKE_TOKEN) {
		res.json(db.getActivePackagesList());
		console.log(`Active-Packages data sent. Valid token: ${token}`);
	} else {
		res.json(null);
		console.log(`Active-Packages data denied. Invalid token: ${token}`);
	}
});

app.delete("/api/cancel-active-package", (req, res) => {
	let { activePackageId, token } = req.body;
	if (token !== process.env.FAKE_TOKEN) {
		res.json({ message: "Invalid token!" });
		console.log(`Cancel active package denied. Invalid token: ${token}`);
	} else {
		if (db.canCancelActivePackage(activePackageId)) {
			db.cancelPackage(activePackageId);
			res.json({ message: "This active package is now cancelled!" });
			console.log(`The active package was cancelled`);
		} else {
			res.json({
				message: "This active package is still in commitment period!"
			});
			console.log(
				`Cancel active package denied. Package in commitment period. ID: ${activePackageId}`
			);
		}
	}
});

app.delete("/api/hand-in-notice", (req, res) => {
	let { teamId, token } = req.body;
	if (token !== process.env.FAKE_TOKEN) {
		res.json({ message: "Invalid token!" });
		console.log(`Hand in team notice denied. Invalid token: ${token}`);
	} else {
		if (db.canTeamHandInNotice(teamId)) {
			db.handInNoticeFromTeam(teamId);
			res.json({ message: "All this team's packages are now cancelled!" });
			console.log(`The team's notice was handed in`);
		} else {
			res.json({
				message: "This team can't hand in notice yet!"
			});
			console.log(
				`Hand in team notice denied. This team can't hand in notice yet. ID: ${teamId}`
			);
		}
	}
});

app.post("/api/token", (req, res) => {
	let { user, password } = req.body;
	let token = authServer.authenticate(user, password, token => {
		res.json({ token });
		console.log("Token sent");
	});
});

// If it's not an API endpoint, serve the client index page
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`hkt-tech-test server is listening on ${port}`);
