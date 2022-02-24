import dependency from "epi/dependency";
import AppSettings from "epi-cms/ApplicationSettings";
import "./components/external-links-list/external-links-list.scss";
// external dependencies
import "xstyle/css!extended-external-links/external-links-list.css";

interface ModuleSettings {
    externalLinksControllerUrl: string;
}

// Edit mode dojo initializer for external links module
// File is used as an entry point in build
export default class ModuleInitializer {
    private _settings: ModuleSettings;

    constructor(settings: ModuleSettings) {
        this._settings = settings;
    }

    initialize(): void {
        AppSettings.externalLinksControllerUrl = this._settings.externalLinksControllerUrl;

        // register new view
        const hashWrapper = dependency.resolve<epi.HashWrapper>("epi.shell.HashWrapper");
        const contextService = dependency.resolve<epi.ContextService>("epi.shell.ContextService");
        contextService.registerRoute("external-links", function (context, callerData) {
            hashWrapper.onContextChange(context, callerData);
        });
    }
}

/*export default declare([_Module], {
    initialize: function () {
        this.inherited(arguments);

        // register new view
        const hashWrapper = dependency.resolve<epi.HashWrapper>("epi.shell.HashWrapper");
        const contextService = dependency.resolve<epi.ContextService>("epi.shell.ContextService");
        contextService.registerRoute("external-links", function (context, callerData) {
            hashWrapper.onContextChange(context, callerData);
        });
    }
});*/
