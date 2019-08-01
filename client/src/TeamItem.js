import React from "react";

function PackageItem(props) {
	return (
		<div className="list-group-item list-group-item">
			<h5>{props.team["team_name"]}</h5>
		</div>
	);
}

export default PackageItem;
