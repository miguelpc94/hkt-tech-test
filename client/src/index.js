import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
	<Router>
		<Route component={App} />
	</Router>,
	document.getElementById("root")
);
