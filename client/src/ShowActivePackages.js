import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from "./useClientContext";
import ActivePackageItem from "./ActivePackageItem";

function ShowActivePackages() {
	let [activePackages, setActivePackages] = useState([]);
	let [shouldUpdate, setShouldUpdate] = useState(false);

	let context = useContext(ClientContext);

	useEffect(() => {
		if (context.isUserAuthenticated()) {
			console.log("Getting active packages...");
			context.db.getActivePackages(activePackage =>
				setActivePackages(activePackage)
			);
		} else {
			console.log("Not authenticated...");
			setActivePackages([]);
		}
		if (shouldUpdate) setShouldUpdate(false);
	}, [context.userData, context.db, context, shouldUpdate]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					<br />
					<h5> Active packages </h5>
					<br />
				</div>
			</div>
			<div className="row">
				<div className="col-2" />
				<div className="list-group col-8">
					{activePackages.map((activePackage, index) => (
						<ActivePackageItem
							key={index}
							requestUpdate={setShouldUpdate}
							activePackage={activePackage}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ShowActivePackages;
