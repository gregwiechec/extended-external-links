import { React_Command } from "./React_Command";

class ExportCommand extends React_Command { //TODO: LINKS move to commands
    label: string = "Export"; //TODO: LINKS resources
    category: string = "context";
    iconClass: string = "epi-iconDownload epi-icon--medium";

    execute() {
        const link = window.document.createElement("a");
        link.setAttribute("href", "/ExternalLinks/export"); //TODO: LINKS fix URL to export
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
    }
}

export { ExportCommand }
