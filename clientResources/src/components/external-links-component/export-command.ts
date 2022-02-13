import declare from "dojo/_base/declare";
import _Command from "epi/shell/command/_Command";
import topic from "dojo/topic";

export default declare([_Command], {
    label: "Export", //TODO: LINKS resources
    category: "context",
    iconClass: "epi-iconDownload epi-icon--medium",

    canExecute: true,
    isActive: true,

    _execute: () => {
        topic.publish("/external-links/export");
    }
});
