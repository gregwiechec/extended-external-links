//https://github.com/dojo/typings/blob/663fa35d1c46533c3b4294f93987d65caab65da7/dojo/1.11/dojo.d.ts
//https://github.com/dojo/typings/blob/663fa35d1c46533c3b4294f93987d65caab65da7/dojo/1.11/modules.d.ts

declare namespace dojo {
    /* general implied types */
    type NodeOrString = Node | string;

    interface GenericObject {
        [id: string]: any;
    }
    interface Handle {
        remove(): void;
    }

    /* dojo/on */

    interface ExtensionEvent {
        (target: Element | GenericObject, listener: EventListener): Handle;
    }
    /* dojo/Stateful */

    interface WatchHandle extends Handle {
        unwatch(): void;
    }

    interface Stateful {
        /**
         * Used across all instances a hash to cache attribute names and their getter
         * and setter names.
         */
        _attrPairNames: { [attr: string]: string };

        /**
         * Helper function for get() and set().
         * Caches attribute name values, so we don't do the string ops every time.
         */
        _getAttrNames(name: string): string;

        /**
         * Automatic setting of params during construction
         */
        postscript(params?: Record<string, any>): void;

        /**
         * Get a property on a Stateful instance.
         */
        get(name: string): any;

        /**
         * Set a property on a Stateful instance
         */
        set(name: string, value: any): this;
        set(name: string, ...values: any[]): this;
        set(name: Record<string, any>): this;

        /**
         * Internal helper for directly changing an attribute value.
         */
        _changeAttrValue(name: string, value: any): this;

        /**
         * Watches a property for changes
         */
        watch(callback: (prop: string, oldValue: any, newValue: any) => void): WatchHandle;
        watch(name: string, callback: (prop: string, oldValue: any, newValue: any) => void): WatchHandle;
    }

    /* dojo/topic */

    interface Topic {
        /**
         * Publishes a message to a topic on the pub/sub hub. All arguments after
         * the first will be passed to the subscribers, so any number of arguments
         * can be provided (not just event).
         */
        publish(topic: string | ExtensionEvent, ...event: any[]): boolean;

        /**
         * Subscribes to a topic on the pub/sub hub
         */
        subscribe(topic: string | ExtensionEvent, listener: EventListener | Function): Handle;
    }

}

declare module "dojo/_base/declare" {
    const dojoDeclare: dojo._base.Declare;
    export = dojoDeclare;
}

declare module "dojo/topic" {
    const hub: dojo.Topic;
    export = hub;
}

declare module "dojo/Stateful" {
    const stateful: dojo.Stateful;
    export = stateful;
}
