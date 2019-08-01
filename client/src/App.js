import React from "react";
import { ClientContext } from "./useClientContext";
import useClientContext from "./useClientContext";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import PackageControl from "./PackageControl";

//<PrivateRoute path="/private" exact component={Private} />
// "admin", "hktadmpass"

function App() {
	let context = useClientContext();

	let redirectToLogin = () => {
		if (!context.isUserAuthenticated()) return <Redirect to="/login" />;
		else return <Redirect to="/packagecontrol" />;
	};

	return (
		<div className="container-fluid">
			<nav
				className="navbar navbar-light"
				style={{ "background-color": "#f5ef42", width: "100%" }}
			>
				<span className="navbar-brand mb-0 h1">
					<b>HUCKLETREE PACKAGE MANAGEMENT</b>
				</span>
				{context.isUserAuthenticated() ? (
					<button
						className="form-inline btn btn-outline-danger my-2 my-sm-0"
						type="submit"
						onClick={() => context.logoff()}
					>
						Log Off
					</button>
				) : null}
			</nav>

			<ClientContext.Provider value={context}>
				{redirectToLogin()}
				<Route path="/login" exact component={Login} />
				<PrivateRoute path="/packagecontrol" component={PackageControl} />
			</ClientContext.Provider>
		</div>
	);
}

export default App;
