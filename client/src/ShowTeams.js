import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from "./useClientContext";
import TeamItem from "./TeamItem";

function ShowTeams() {
	let [teams, setTeams] = useState([]);
	let [shouldUpdate, setShouldUpdate] = useState(false);

	let context = useContext(ClientContext);

	useEffect(() => {
		if (context.isUserAuthenticated()) {
			console.log("Getting teams...");
			context.db.getTeams(teams => setTeams(teams));
		} else {
			console.log("Not authenticated...");
			setTeams([]);
		}
		if (shouldUpdate) setShouldUpdate(false);
	}, [context.userData, context.db, context, shouldUpdate]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-1" />
				<div className="col-10">
					<br />
					<h5> Teams </h5>
					<br />
				</div>
			</div>
			<div className="row">
				<div className="col-1" />
				<div className="list-group col-10">
					{teams.map((team, index) => (
						<TeamItem requestUpdate={setShouldUpdate} key={index} team={team} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ShowTeams;
