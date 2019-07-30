require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

let dataBase = {
	packages: [
		[
			1,
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
		[
			2,
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
		[
			3,
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
		[
			4,
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
	]
};

app.get("/api/packages", (req, res) => {
	res.json(dataBase.packages);

	console.log("Package data sent");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`hkt-tech-test server is listening on ${port}`);
