import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, {ServerSettings} from "./server-settings";
import "./index.css";
import App from "./components/app/App";

import declare from "dojo/_base/declare";
import topic from "dojo/topic";
import WidgetBase from "dijit/_WidgetBase";
import { DataItem } from "./definitions";

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

        const self = this;
        function changeContext(item: DataItem) {
            const callerData = {
                sender: self
            };
            topic.publish("/epi/shell/context/request", { uri: "epi.cms.contentdata:///" + item.contentLink }, callerData);
        }

        ReactDOM.render(
            <React.StrictMode>
                <ServerSettingsContext.Provider value={settings}>
                    <App onContentClick={changeContext} />
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
