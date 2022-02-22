import { ReactCommand } from "./React_Command";
import { Resources } from "../../../resources-context";
import { ServerSettings } from "../../../server-settings";

class ExportCommand extends ReactCommand {
    label: string = "Export";
    category: string = "context";
    iconClass: string = "epi-iconDownload epi-icon--medium";
    private _settings: ServerSettings;

    constructor(resources: Resources, settings: ServerSettings) {
        super();
        this._settings = settings;
        this.label = resources.export;
    }

    execute() {
        const link = window.document.createElement("a");
        link.setAttribute("href", this._settings.externalLinksControllerUrl + "/Export");
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
    }
}

export { ExportCommand };
