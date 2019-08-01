import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ClientContext } from "./useClientContext";

function PrivateRoute({ component: Component, ...rest }) {
	let context = useContext(ClientContext);
	return (
		<Route
			{...rest}
			render={props => {
				if (!context.isUserAuthenticated()) return <Redirect to="/login" />;

				return <Component {...props} />;
			}}
		/>
	);
}

export default PrivateRoute;
