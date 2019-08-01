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
