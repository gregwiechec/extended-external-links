declare namespace dijit {
    /* Global Dijit Interface */

    interface Dijit {
    }

    /* dijit/_AttachMixin */

    /* tslint:disable:class-name */

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

    interface _WidgetBaseConstructor<W> extends Pick<dojo._base.DeclareConstructor<W>, Exclude<keyof dojo._base.DeclareConstructor<W>, 'new'>> {
        new (params?: Partial<W> & ThisType<W>, srcNodeRef?: dojo.NodeOrString): W & dojo._base.DeclareCreatedObject;
    }
}


declare module "dijit/_WidgetBase" {
    type _WidgetBase = dijit._WidgetBase;
    const _WidgetBase: dijit._WidgetBaseConstructor<_WidgetBase>;
    export = _WidgetBase;
}