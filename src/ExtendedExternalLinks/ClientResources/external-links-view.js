define([
    "dojo/_base/declare",
    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
	"epi/shell/command/builder/ButtonBuilder",
	"dojo/Stateful",
	"epi/shell/DestroyableByKey",
	"epi-cms/content-approval/command/CancelChanges",
    "./external-links-widget",
    "dojo/text!./templates/external-links-component.html",

    // Widgets in template
    "dijit/Toolbar"
], function (
    declare,
	_LayoutWidget,
	_TemplatedMixin,
	_WidgetsInTemplateMixin,
	ButtonBuilder,
	Stateful,
	DestroyableByKey,
	CancelChanges,
    ExternalLinksWidget,
    template
) {
	var Model = declare([Stateful, DestroyableByKey], {
		isDirty: false
	});


    return declare([_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

		buildRendering: function () {
            this.inherited(arguments);

            var model = new Model();
			var builder = new ButtonBuilder();
            var cancelCommand = new CancelChanges({ model: model, order: 20 })
            builder.create(cancelCommand, this.commandNode);

            var externalLinksWidget = new ExternalLinksWidget();
            this.own(externalLinksWidget);
            externalLinksWidget.placeAt(this.externalWidgetNode);
        }
    });
});
