import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";
import "./index.css";
import { store } from "./store/store";
import AuthProvider from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</Provider>
);
