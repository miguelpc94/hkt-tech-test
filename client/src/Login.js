import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { ClientContext } from "./useClientContext";

// "admin", "hktadmpass"

function Login() {
	let context = useContext(ClientContext);
	let [redirectToMain, setRedirectToMain] = useState(null);
	let [username, setUsername] = useState(null);
	let [password, setPassword] = useState(null);

	useEffect(() => {
		if (context.isUserAuthenticated())
			setRedirectToMain(<Redirect to="/packagecontrol/active-packages" />);
		else setRedirectToMain(null);
	}, [context]);

	let handleUsernameChange = event => {
		setUsername(event.target.value);
	};

	let handlePasswordChange = event => {
		setPassword(event.target.value);
	};

	let handleSubmit = event => {
		context.login(username, password, isAuthenticated => {
			if (!isAuthenticated) {
				alert("Invalid user!");
				setUsername(null);
				setPassword(null);
			}
		});
		event.preventDefault();
	};

	return (
		<div className="container-fluid">
			{redirectToMain}
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					<br />
					<h5>Log in</h5>
					<br />
				</div>
			</div>
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					<form onSubmit={handleSubmit}>
						<div class="form-group">
							<label for="usernameInput">Username</label>
							<input
								type="username"
								className="form-control"
								id="usernameInput"
								placeholder="Enter username"
								value={username}
								onChange={handleUsernameChange}
							/>
						</div>
						<div class="form-group">
							<label for="inputPassword">Password</label>
							<input
								type="password"
								class="form-control"
								id="inputPassword"
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
						<button type="submit" class="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
