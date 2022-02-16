import declare from "dojo/_base/declare";
import _Command from "epi/shell/command/_Command";

export default declare([_Command], {
    label: "Export", //TODO: LINKS resources
    category: "context",
    iconClass: "epi-iconDownload epi-icon--medium",

    canExecute: true,
    isActive: true,

    _execute: () => {
        const link = document.createElement("a");
        link.setAttribute("href", "/ExternalLinks/export"); //TODO: LINKS fix URL to export
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
    }
});
