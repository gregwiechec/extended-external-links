import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import ExternalLinksList from "./../external-links-list/external-links-list";
import ShowViewCommand from "./show-view-command";
import RefreshCommand from "./refresh-command";
import ExportCommand from "./export-command";

import declare from "dojo/_base/declare";
import topic from "dojo/topic";
import WidgetBase from "dijit/_WidgetBase";
import Destroyable from "dijit/Destroyable";
import _WidgetCommandProviderMixin from "epi/shell/command/_WidgetCommandProviderMixin";
import { dataService as defaultDataService } from "./../../data-service/data-service";
import changeContext from "./../../utils/change-context";

const CustomExternalLinks = ({ sender }) => {
    const [refreshIdx, setRefreshIdx] = useState(1);

    useEffect(() => {
        let handle = topic.subscribe("/external-links/reload", () => {
            setRefreshIdx(refreshIdx + 1);
        });
        return () => {
            handle.remove();
            handle = null;
        };
    });

    return <ExternalLinksList onContentClick={changeContext(sender)} reloadIdx={refreshIdx} />;
};

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

        this.add("commands", new ShowViewCommand());
        this.add("commands", new RefreshCommand());
        this.add("commands", new ExportCommand());

        ReactDOM.render(
            <React.StrictMode>
                <ServerSettingsContext.Provider value={settings}>
                    <CustomExternalLinks sender={self} />
                </ServerSettingsContext.Provider>
            </React.StrictMode>,
            this.domNode
        );
    },
    destroy: function () {
        ReactDOM.unmountComponentAtNode(this.domNode);
    }
});
