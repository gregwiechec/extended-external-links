define([
    "dojo/_base/declare",
    "dijit/Destroyable",
    "epi/shell/command/_Command"
], function (
    declare,
    Destroyable,
    _Command
) {
    return declare([_Command, Destroyable], {
        iconClass: "epi-iconListTree",
        tooltip: "Show",//resources.toolbar.buttons.togglenavigationpane,
        label: "Show",//resources.toolbar.buttons.togglenavigationpane,
        order: -10000, //Give it a low nr to make it more probable that it is always the first button
        canExecute: true,
        constructor: function () {
            this.own(
                /*topic.subscribe("/epi/layout/pinnable/navigation/visibilitychanged", lang.hitch(this, function (visible) {
                    this.set("active", visible);
                }))*/
            );
        },
        _execute: function () {
            //topic.publish("/epi/layout/pinnable/navigation/toggle");
            alert(1);
        }

    });
});
