import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import { dataService as defaultDataService } from "./../../data-service/data-service";
import { ExternalLinksView } from "./external-links-view";
import changeContext from "../../utils/change-context";
// external imports
import declare from "dojo/_base/declare";
import Stateful from "dojo/Stateful";
import _LayoutWidget from "dijit/layout/_LayoutWidget";
import CancelChanges from "epi-cms/content-approval/command/CancelChanges";

//TODO: LINKS try to remove declare
const Model = declare([Stateful], {
    isDirty: false
});

/**
 * External links view is used to display custom view in Edit Mode
 */
export default declare([_LayoutWidget], {
    class: "external-links-view-container",

    postCreate: function () {
        const configuration = {
            baseUrl: ""
        }; //JSON.parse(rootElement?.dataset?.configuration || "{}");
        axios.defaults.baseURL = configuration.baseUrl;

        const settings: ServerSettings = {
            dataService: defaultDataService
        };

        const model = new Model();
        //TODO: LINKS own command
        const command = new CancelChanges({ model: model, order: 20 });

        const self = this;
        ReactDOM.render(
            <React.StrictMode>
                <ServerSettingsContext.Provider value={settings}>
                    <ExternalLinksView onContentClick={changeContext(self)} closeCommand={command} />
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
