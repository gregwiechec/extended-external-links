define([
    "dojo/_base/declare",
    "dijit/form/Button",
    "epi/_Module",
    "epi/dependency",
    "./show-external-links-command"
], function (
    declare,
    Button,
    _Module,
    dependency,
    ShowExternalLinksCommand
) {
    return declare([_Module], {
        initialize: function () {
            this.inherited(arguments);

            // register new view
            var hashWrapper = dependency.resolve("epi.shell.HashWrapper");
            var contextService = dependency.resolve("epi.shell.ContextService");
            contextService.registerRoute("external-links", function (context, callerData) {
                hashWrapper.onContextChange(context, callerData);
            });

            // add global command
            var commandRegistry = dependency.resolve("epi.globalcommandregistry");
            var provider = commandRegistry.get("epi.cms.globalToolbar");
            provider.providers[0].addToTrailing(new ShowExternalLinksCommand(), {
                widget: Button,
                "class": "epi-mediumButton epi-chromelessButton"
            });
        }
    });
});
