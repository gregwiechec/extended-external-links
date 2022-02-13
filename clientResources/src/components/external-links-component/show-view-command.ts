import declare from "dojo/_base/declare";
import Destroyable from "dijit/Destroyable";
import _Command from "epi/shell/command/_Command";
import topic from "dojo/topic";

export default declare([_Command, Destroyable], {
    label: "show view",
    category: "context",
    iconClass: "epi-iconReferences epi-icon--medium",

    canExecute: true,
    isActive: true,

    constructor: function () {
        this.own(
            topic.subscribe("/epi/shell/action/viewchanged", this._viewChanged.bind(this))
        );
    },

    _execute: () => {
        topic.publish("/epi/shell/context/request",
            { uri: "external-links:///1" },
            { sender: null });
    },

    _viewChanged: function (type, args, data) {
        this.set("isAvailable", type !== "extended-external-links/external-links-component");
        //TODO: (LINKS) links is available is not set when refreshing the page
    }
});
