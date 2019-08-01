import React, { useState, useEffect, useReducer } from "react";
import DataBase from "./DataBase";
import auth from "./Auth";

const ClientContext = React.createContext();

function useClienteContext() {
	let db = new DataBase(auth);

	const userDataReducer = (userData, action) => {
		switch (action.type) {
			case "login":
				console.log(`${action.username} logged in!`);
				return {
					username: action.username,
					isAuthenticated: action.isAuthenticated
				};
			case "logoff":
				console.log(`${userData.username} logged off...`);
				auth.logoff();
				return { username: null, isAuthenticated: false };
			default:
				throw new Error("Invalid action on user and password data!");
		}
	};
	const [userData, userDataDispatch] = useReducer(userDataReducer, {
		username: null,
		isAuthenticated: false
	});

	let isUserAuthenticated = () => {
		if (userData.isAuthenticated) return true;
		if (auth.isAuthenticated) {
			userDataDispatch({
				username: auth.username,
				isAuthenticated: auth.isAuthenticated,
				type: "login"
			});
			return true;
		}
		return false;
	};

	let login = (username, password) =>
		auth.login(username, password, isAuthenticated => {
			if (isAuthenticated) {
				userDataDispatch({ username, isAuthenticated, type: "login" });
			}
		});

	let logoff = () => {
		userDataDispatch({ type: "logoff" });
	};

	return {
		db,
		isUserAuthenticated,
		username: userData.username,
		login,
		logoff
	};
}

export { ClientContext };
export default useClienteContext;
