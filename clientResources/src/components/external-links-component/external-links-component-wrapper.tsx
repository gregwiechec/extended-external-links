import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import { dataService as defaultDataService } from "./../../data-service/data-service";
import changeContext from "./../../utils/change-context";
import { ExternalLinksListComponent } from "./external-links-component";
import { ExportCommand, RefreshCommand, ShowViewCommand } from "./commands";
import { ResourcesContext } from "../../resources-context";
// external imports
import declare from "dojo/_base/declare";
import topic from "dojo/topic";
import WidgetBase from "dijit/_WidgetBase";
import Destroyable from "dijit/Destroyable";
import _WidgetCommandProviderMixin from "epi/shell/command/_WidgetCommandProviderMixin";
import resources from "epi/i18n!epi/cms/nls/externallinks";

/**
 * Component is used to display component in Edit Mode
 */
export default declare([WidgetBase, _WidgetCommandProviderMixin, Destroyable], {
    //TODO: use common mixin for widget and component
    class: "external-links-component-container",

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

        this.add("commands", new ShowViewCommand(topic));
        this.add("commands", new RefreshCommand(topic));
        this.add("commands", new ExportCommand());

        ReactDOM.render(
            <React.StrictMode>
                <ResourcesContext.Provider value={resources}>
                    <ServerSettingsContext.Provider value={settings}>
                        <ExternalLinksListComponent onContentClick={changeContext(self)} topic={topic} />
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
//TODO: component should support only detailed
