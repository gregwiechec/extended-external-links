import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ServerSettingsContext, ServerSettings } from "../../server-settings";
import { dataService as defaultDataService } from "./../../data-service/data-service";
import { ExternalLinksView } from "./external-links-view";
import { changeContext } from "../../utils/change-context";
import { ResourcesContext } from "../../resources-context";
// external imports
import declare from "dojo/_base/declare";
import _LayoutWidget from "dijit/layout/_LayoutWidget";
import CancelChanges from "epi-cms/content-approval/command/CancelChanges";
import resources from "epi/i18n!epi/cms/nls/externallinks";
import { ReactStateful } from "../external-links-component/commands/React_Stateful";

class CancelChangesModel extends ReactStateful {
    isDirty: boolean = false
}

/**
 * External links view is used to display custom view in Edit Mode
 */
export default declare([_LayoutWidget], {
    class: "external-links-view-container",

    postCreate: function () {
        debugger;
        axios.defaults.baseURL = this.params.externalLinksControllerUrl;

        const settings: ServerSettings = {
            dataService: defaultDataService
        };

        const model = new CancelChangesModel();
        const command = new CancelChanges({ model: model, order: 20 });
        this.own(command);

        const self = this;
        ReactDOM.render(
            <React.StrictMode>
                <ResourcesContext.Provider value={resources}>
                    <ServerSettingsContext.Provider value={settings}>
                        <ExternalLinksView onContentClick={changeContext(self)} closeCommand={command} />
                    </ServerSettingsContext.Provider>
                </ResourcesContext.Provider>
            </React.StrictMode>,
            this.domNode
        );
    },
    destroy: function () {
        ReactDOM.unmountComponentAtNode(this.domNode);
    }
});
//TODO: LINKS future allow to filter by Content with searchable text
