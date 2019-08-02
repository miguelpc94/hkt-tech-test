import React, { useContext } from "react";
import { ClientContext } from "./useClientContext";

function PackageItem(props) {
	let context = useContext(ClientContext);

	let handInNotice = () => {
		context.db.handInNotice(props.team["id"], message => {
			alert(message);
			props.requestUpdate(true);
		});
	};

	return (
		<div className="list-group-item list-group-item">
			<div className="d-flex justify-content-between">
				<h5>{props.team["team_name"]}</h5>
				{props.team["can_hand_in_notice"] ? (
					<button
						type="button"
						class="btn btn-danger"
						onClick={() => handInNotice()}
					>
						Hand in notice
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default PackageItem;
