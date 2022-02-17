import declare from "dojo/_base/declare";
import _Module from "epi/_Module";
import dependency from "epi/dependency";

// Edit mode dojo initializer for external links module
// File is used as an entry point in build
export default declare([_Module], {
    initialize: function () {
        this.inherited(arguments);

        // register new view
        const hashWrapper = dependency.resolve<epi.HashWrapper>("epi.shell.HashWrapper");
        const contextService = dependency.resolve<epi.ContextService>("epi.shell.ContextService");
        contextService.registerRoute("external-links", function (context, callerData) {
            hashWrapper.onContextChange(context, callerData);
        });
    }
});
