import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { ClientContext } from "./useClientContext";

function Login() {
	let context = useContext(ClientContext);
	let [redirectToMain, setRedirectToMain] = useState(null);

	useEffect(() => {
		if (context.isUserAuthenticated())
			setRedirectToMain(<Redirect to="/packagecontrol/packages" />);
		else setRedirectToMain(null);
	}, [context]);

	return (
		<div className="container-fluid">
			{redirectToMain}
			<button onClick={() => context.login("admin", "hktadmpass")}>
				Log in
			</button>
			<button onClick={() => context.logoff()}>Log off</button>
		</div>
	);
}

export default Login;
