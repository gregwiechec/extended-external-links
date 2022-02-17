import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import { dataService as defaultDataService } from "./../../data-service/data-service";
import changeContext from "./../../utils/change-context";
import { ExternalLinksListComponent } from "./external-links-component";
import ShowViewCommand from "./show-view-command";
import RefreshCommand from "./refresh-command";
import ExportCommand from "./export-command";
// external imports
import declare from "dojo/_base/declare";
import topic from "dojo/topic";
import WidgetBase from "dijit/_WidgetBase";
import Destroyable from "dijit/Destroyable";
import _WidgetCommandProviderMixin from "epi/shell/command/_WidgetCommandProviderMixin";

export default declare([WidgetBase, _WidgetCommandProviderMixin, Destroyable], {
    //TODO: use common mixin for widget and component
    class: "external-links-container",

    minHeight: 400,

    postCreate: function () {
        const configuration = {
            baseUrl: ""
        }; //JSON.parse(rootElement?.dataset?.configuration || "{}");
        axios.defaults.baseURL = configuration.baseUrl;

        const settings: ServerSettings = {
            dataService: defaultDataService
        };

        const self = this;

        this.add("commands", new ShowViewCommand()); //TODO: LINKS try to conver command to classes
        this.add("commands", new RefreshCommand());
        this.add("commands", new ExportCommand());

        ReactDOM.render(
            <React.StrictMode>
                <ServerSettingsContext.Provider value={settings}>
                    <ExternalLinksListComponent onContentClick={changeContext(self)} topic={topic} />
                </ServerSettingsContext.Provider>
            </React.StrictMode>,
            this.domNode
        );
    },
    destroy: function () {
        ReactDOM.unmountComponentAtNode(this.domNode);
    }
});
