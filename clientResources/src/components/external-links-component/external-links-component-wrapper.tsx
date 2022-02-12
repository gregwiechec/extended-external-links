import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import ExternalLinksList from "./../external-links-list/external-links-list";

import declare from "dojo/_base/declare";
import topic from "dojo/topic";
import WidgetBase from "dijit/_WidgetBase";
import { DataItem } from "../../definitions";
import { dataService as defaultDataService } from "./../../data-service/data-service";

export default declare([WidgetBase], {//TODO: use common mixin for widget and component
    "class": "external-links-container",

    minHeight: 300,

    postCreate: function () {
        //const rootElement = document.getElementById("root");
        const configuration = {
            baseUrl: ""
        }; //JSON.parse(rootElement?.dataset?.configuration || "{}");
        axios.defaults.baseURL = configuration.baseUrl;

        const settings: ServerSettings = {
            dataService: defaultDataService
        };

        const self = this;
        function changeContext(item: DataItem) {
            const callerData = {
                sender: self
            };
            topic.publish(
                "/epi/shell/context/request",
                { uri: "epi.cms.contentdata:///" + item.contentLink },
                callerData
            );
        }

        ReactDOM.render(
            <React.StrictMode>
                <ServerSettingsContext.Provider value={settings}>
                    <ExternalLinksList onContentClick={changeContext} />
                </ServerSettingsContext.Provider>
            </React.StrictMode>,
            this.domNode
        );
    },
    destroy: function () {
        ReactDOM.unmountComponentAtNode(this.domNode);
    }
});
