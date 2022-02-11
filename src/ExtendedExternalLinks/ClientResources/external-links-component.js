define([
    // Dojo
    "dojo",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-geometry",
    "dojo/topic",

    // Dijit
    "dijit/_TemplatedMixin",
    "dijit/_Container",
    "dijit/layout/_LayoutWidget",
    "dijit/_WidgetsInTemplateMixin",

    // EPi Framework
    "epi",

    // EPi CMS
   
    "epi/i18n!epi/cms/nls/episerver.cms.components.tasks"
], function (
    // Dojo
    dojo,
    declare,
    lang,
    domConstruct,
    domGeometry,
    topic,

    // Dijit
    _TemplatedMixin,
    _Container,
    _LayoutWidget,
    _WidgetsInTemplateMixin,

    // EPi Framework
    epi,

    // EPi CMS
    resources
) {

    return declare([_Container, _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: "<div>aaa</div>",

        resources: resources,
/*
        querySelection: null,

        // model: [ReadOnly] TasksViewModel
        //      The model for the view
        model: null,

        _selectionChangedEventHandler: null,

        buildRendering: function () {

            this.inherited(arguments);

            this.model = new TasksViewModel({ categories: this.categories });

            this.querySelection = new Select({
                name: "QuerySelection",
                options: this.model.getOptions()
            });

            domConstruct.place(this.querySelection.domNode, this.reloadButton.domNode, "before");

            this.own(
                this.querySelection.on("change", lang.hitch(this, this._reloadQuery)),
                topic.subscribe("/epi/cms/action/refreshmytasks", lang.hitch(this, this._reloadQuery))
            );
        },
*/

        startup: function () {
            this.inherited(arguments);

            // Set the initial query after the grid has been initialized
            //this._reloadQuery();
        }
    });
});
