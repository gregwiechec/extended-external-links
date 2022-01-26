import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import ServerSettingsContext, {ServerSettings} from "./server-settings";
import "./index.css";
import "optimizely-oui/dist/styles.css";
import App from "./components/app/App";

const rootElement = document.getElementById("root");
const configuration = JSON.parse(rootElement?.dataset?.configuration || "{}");
axios.defaults.baseURL = configuration.baseUrl;

const settings: ServerSettings = {
    contentUrl: configuration.contentUrl
};

ReactDOM.render(
    <React.StrictMode>
        <ServerSettingsContext.Provider value={settings}>
            <App />
        </ServerSettingsContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
