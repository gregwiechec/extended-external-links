import { React_Command } from "./React_Command";

class ExportCommand extends React_Command { //TODO: LINKS move to commands
    label: "Export"; //TODO: LINKS resources
    category: "context";
    iconClass: "epi-iconDownload epi-icon--medium";

    _execute() {
        const link = window.document.createElement("a");
        link.setAttribute("href", "/ExternalLinks/export"); //TODO: LINKS fix URL to export
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
    }
}

export { ExportCommand }
