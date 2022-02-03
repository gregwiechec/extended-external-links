define([
    "dojo/_base/declare",
    "epi/_Module",
    "epi/dependency"
], function (
    declare,
    _Module,
    dependency
) {
    return declare([_Module], {
        initialize: function () {
            this.inherited(arguments);

            var hashWrapper = dependency.resolve("epi.shell.HashWrapper");
            var contextService = dependency.resolve("epi.shell.ContextService");
            contextService.registerRoute("external-links", function (context, callerData) {
                hashWrapper.onContextChange(context, callerData);
            });
        }
    });
});
