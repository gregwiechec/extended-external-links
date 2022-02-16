//TODO: LINKS all code related with view should be in this file
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import { dataService as defaultDataService } from "./../../data-service/data-service";
import { ExternalLinksView } from "./external-links-view";
import changeContext from "../../utils/change-context";
// external imports
import declare from "dojo/_base/declare";
import WidgetBase from "dijit/_WidgetBase";

export default declare([WidgetBase], {
    class: "external-links-view-container",

    postCreate: function () {
        const configuration = {
            baseUrl: ""
        }; //JSON.parse(rootElement?.dataset?.configuration || "{}");
        axios.defaults.baseURL = configuration.baseUrl;

        const settings: ServerSettings = {
            dataService: defaultDataService
        };

        const self = this;
        ReactDOM.render(
            <React.StrictMode>
                <ServerSettingsContext.Provider value={settings}>
                    <ExternalLinksView onContentClick={changeContext(self)} />
                </ServerSettingsContext.Provider>
            </React.StrictMode>,
            this.domNode
        );
    },
    destroy: function () {
        ReactDOM.unmountComponentAtNode(this.domNode);
    }
});
//TODO: LINKS server view is rendered with id
