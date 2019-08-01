import React from "react";

function PackageItem(props) {
	return (
		<div className="list-group-item list-group-item">
			<div className="d-flex justify-content-between">
				<h5>{props.pkg["name"]}</h5>
				<span className="badge badge-success">
					<h6>£ {props.pkg["price"]}</h6>
				</span>
			</div>
			<hr />
			<p className="mb-1">{props.pkg["description"]}</p>
			<br />
			<p className="mb-1">
				<b>Desk type: </b>
				{props.pkg["desk_type"]}
			</p>
			{props.pkg["desk_type"] !== "flexi" ? (
				<p className="mb-1">
					<b>Commitment period: </b>
					{props.pkg["commitment_period"]} month(s)
				</p>
			) : (
				<p className="mb-1">
					<b>Days: </b>
					{props.pkg["days"]} days
				</p>
			)}
			{props.pkg["desk_type"] !== "flexi" ? (
				<p className="mb-1">
					<b>Cancellation period: </b>
					{props.pkg["cancellation_period"]} month(s)
				</p>
			) : (
				""
			)}
			<p className="mb-1">
				<b>Credits: </b>
				{props.pkg["mr_credits"]}
			</p>
			<br />
			{props.pkg["sell_limit"] !== null ? (
				<small>Sell limit: {props.pkg["sell_limit"]}</small>
			) : (
				""
			)}
		</div>
	);
}

export default PackageItem;
