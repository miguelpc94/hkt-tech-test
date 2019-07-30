import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	let [packages, setPackages] = useState([]);

	let getPackages = () => {
		fetch("/api/packages")
			.then(res => res.json())
			.then(packages => setPackages(packages));
	};

	useEffect(() => {
		getPackages();
	}, []);

	return (
		<>
			<ul>
				{packages.map((pck, index) => (
					<li key={index}>{pck[1] + " " + pck[2]}</li>
				))}
			</ul>
		</>
	);
}

export default App;
