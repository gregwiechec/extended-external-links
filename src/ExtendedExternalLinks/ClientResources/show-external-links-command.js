define([
    "dojo/_base/declare",
    "dojo/topic",
    "dijit/Destroyable",
    "epi/shell/command/_Command"
], function (
    declare,
    topic,
    Destroyable,
    _Command
) {
    return declare([_Command, Destroyable], {
        iconClass: "epi-iconReferences epi-icon--medium",
        tooltip: "Show",//resources.toolbar.buttons.togglenavigationpane,
        label: "Show",//resources.toolbar.buttons.togglenavigationpane,
        order: -10000, //Give it a low nr to make it more probable that it is always the first button
        canExecute: true,

        constructor: function () {
            this.own(
                topic.subscribe("/epi/shell/action/viewchanged", this._viewChanged.bind(this))
            );
        },

        _execute: function () {
            topic.publish("/epi/shell/context/request",
                { uri: "external-links:///1" },
                { sender: null });
        },

        _viewChanged: function (type, args, data) {
            this.set("isAvailable", type !== "extended-external-links/external-links-component");
            //TODO: (LINKS) links is available is not set when refreshing the page
        }
    });
});
