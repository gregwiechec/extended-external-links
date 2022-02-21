declare namespace dijit {
    /* Global Dijit Interface */

    /*interface Dijit {
    }*/

    /* dijit/_AttachMixin */

    /* tslint:disable:class-name */

    // eslint-disable-next-line @typescript-eslint/class-name-casing
    interface _WidgetBase extends dojo.Stateful, Destroyable {
        dojoAttachEvent: string;
        dojoAttachPoint: string;
    }
    /* dijit/Destroyable */

    interface Destroyable {
        _destroyed?: true;

        /**
         * Destroy this class, releasing any resources registered via own().
         */
        destroy(preserveDom?: boolean): void;

        /**
         * Track specified handles and remove/destroy them when this instance is destroyed, unless they were
         * already removed/destroyed manually.
         */
        own(...args: any[]): any[];
    }

    // eslint-disable-next-line @typescript-eslint/class-name-casing
    interface _WidgetBaseConstructor<W> extends Pick<dojo._base.DeclareConstructor<W>, Exclude<keyof dojo._base.DeclareConstructor<W>, 'new'>> {
        new (params?: Partial<W> & ThisType<W>, srcNodeRef?: dojo.NodeOrString): W & dojo._base.DeclareCreatedObject;
    }
}

declare module "dijit/_WidgetBase" {
    type _WidgetBase = dijit._WidgetBase;
    const _WidgetBase: dijit._WidgetBaseConstructor<_WidgetBase>;
    export = _WidgetBase;
}

declare module "dijit/Destroyable" {
    const Destroyable: dijit.Destroyable;
    export = Destroyable;
}

declare module "dijit/layout/_LayoutWidget" {
    const _LayoutWidget: any; //TODO: LINKS copy definition
    export = _LayoutWidget;
}
