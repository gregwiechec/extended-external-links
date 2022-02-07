import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, {ServerSettings} from "./server-settings";
import "./index.css";
import "optimizely-oui/dist/styles.css";
import App from "./components/app/App";

import declare from "dojo/_base/declare";
import WidgetBase from "dijit/_WidgetBase";


export default declare([WidgetBase], {
    postCreate: function() {
        //const rootElement = document.getElementById("root");
        const configuration = {
            baseUrl: "",
            contentUrl: ""
        };//JSON.parse(rootElement?.dataset?.configuration || "{}");
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
            this.domNode
        );
    },
    destroy: function() {
        ReactDOM.unmountComponentAtNode(this.domNode);
    }
});

/*
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
*/
