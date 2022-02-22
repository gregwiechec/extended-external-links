import { ReactCommand } from "./React_Command";
import { Resources } from "../../../resources-context";

class ExportCommand extends ReactCommand {
    label: string = "Export";
    category: string = "context";
    iconClass: string = "epi-iconDownload epi-icon--medium";

    constructor(resources: Resources) {
        super();
        this.label = resources.export;
    }

    execute() {
        const link = window.document.createElement("a");
        link.setAttribute("href", "/EPiServer/extended-external-links/ExternalLinks/Export"); //TODO: LINKS fix URL to export
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
    }
}

export { ExportCommand };
