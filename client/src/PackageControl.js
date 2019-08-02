import React from "react";
import ShowPackages from "./ShowPackages";
import ShowTeams from "./ShowTeams";
import ShowActivePackages from "./ShowActivePackages";
import { ClientContext } from "./useClientContext";
import { Route, Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function PackageControl() {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link className="nav-link" to="/packagecontrol/active-packages">
							Active packages
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/packagecontrol/packages">
							Packages
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/packagecontrol/teams">
							Teams
						</Link>
					</li>
				</ul>
			</nav>
			<Route
				path="/packagecontrol/active-packages"
				component={ShowActivePackages}
			/>
			<Route path="/packagecontrol/packages" component={ShowPackages} />
			<Route path="/packagecontrol/teams" component={ShowTeams} />
		</>
	);
}

export default PackageControl;
