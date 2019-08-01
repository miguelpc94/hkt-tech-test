import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from "./useClientContext";
import PackageItem from "./PackageItem";

function ShowPackages() {
	let [packages, setPackages] = useState([]);

	let context = useContext(ClientContext);

	useEffect(() => {
		if (context.isUserAuthenticated()) {
			console.log("Getting packages...");
			context.db.getPackages(packages => setPackages(packages));
		} else {
			console.log("Not authenticated...");
			setPackages([]);
		}
	}, [context.userData, context.db, context]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					<br />
					<h5> Packages </h5>
					<br />
				</div>
			</div>
			<div className="row">
				<div className="col-2" />
				<div className="list-group col-8">
					{packages.map((pkg, index) => (
						<PackageItem key={index} pkg={pkg} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ShowPackages;
