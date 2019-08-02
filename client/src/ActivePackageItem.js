import React, { useContext } from "react";
import { ClientContext } from "./useClientContext";

function ActivePackageItem(props) {
	let context = useContext(ClientContext);

	let cancelPackage = () => {
		context.db.cancelPackage(props.activePackage["id"], message => {
			alert(message);
			props.requestUpdate(true);
		});
	};

	return (
		<div className="list-group-item list-group-item">
			<div className="d-flex justify-content-between">
				<h5>{props.activePackage["package_name"]}</h5>
				{props.activePackage["can_cancel"] ? (
					<button
						type="button"
						class="btn btn-danger"
						onClick={() => cancelPackage()}
					>
						Cancel
					</button>
				) : (
					""
				)}
			</div>
			<hr />
			<p className="mb-1">
				<b>Team: </b>
				{props.activePackage["team_name"]}
			</p>
			<p className="mb-1">
				<b>Start date: </b>
				{props.activePackage["start_date"]}
			</p>
			{props.activePackage["end_date"] !== null ? (
				<p className="mb-1">
					<b>End date: </b>
					{props.activePackage["end_date"]}
				</p>
			) : (
				""
			)}
			<br />
		</div>
	);
}

export default ActivePackageItem;
