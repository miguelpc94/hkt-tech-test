import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from "./useClientContext";
import TeamItem from "./TeamItem";

function ShowTeams() {
	let [teams, setTeams] = useState([]);

	let context = useContext(ClientContext);

	useEffect(() => {
		if (context.isUserAuthenticated()) {
			console.log("Getting teams...");
			context.db.getTeams(teams => setTeams(teams));
		} else {
			console.log("Not authenticated...");
			setTeams([]);
		}
	}, [context.userData, context.db, context]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					<br />
					<h5> Teams </h5>
					<br />
				</div>
			</div>
			<div className="row">
				<div className="col-2" />
				<div className="list-group col-8">
					{teams.map((team, index) => (
						<TeamItem key={index} team={team} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ShowTeams;
