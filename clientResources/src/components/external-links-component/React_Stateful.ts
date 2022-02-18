class React_Stateful {
    /**
     * Used across all instances a hash to cache attribute names and their getter
     * and setter names.
     * @private
     */
    private _attrPairNames: Record<string, Record<string, string>> = {};

    /**
     * Get a named property on a Stateful object. The property may
     * potentially be retrieved via a getter method in subclasses. In the base class
     * this just retrieves the object's property.
     * @param name The property to get.
     * @returns The property value on this Stateful instance.
     */
    get(name: string): any {
        return this._get(name, this._getAttrNames(name)); //Any
    }

    /**
     * Function that does a get based off a hash of names
     * @param name
     * @param names Hash of names of custom attributes
     * @private
     */
    private _get(name: string, names: Record<string, string>): any {
        return typeof this[names.g] === "function" ? this[names.g]() : this[name];
    }

    /**
     * Helper function for get() and set().
     * Caches attribute name values so we don't do the string ops every time.
     * @param name
     */
    private _getAttrNames(name): Record<string, string> {
        const apn = this._attrPairNames;
        if (apn[name]) {
            return apn[name];
        }
        return (apn[name] = {
            s: "_" + name + "Setter",
            g: "_" + name + "Getter"
        });
    }

    _watchCallbacks: (name: string, oldValue: any, value: any, ignoreCatchall: any) => void;

    /**
     * Watches a property for changes
     * @param name Indicates the property to watch. This is optional (the callback may be the only parameter), and if omitted, all the properties will be watched
     * @param callback The function to execute when the property changes. This will be called after	the property has been changed. The callback will be called with the |this|
     set to the instance, the first argument as the name of the property, the second argument as the old value and the third argument as the new value.
     * @returns An object handle for the watch. The unwatch method of this object can be used to discontinue watching this property
     * @example
     *     var watchHandle = obj.watch("foo", callback);
     *     watchHandle.unwatch(); // callback won't be called now
     */
    watch(name: string, callback: () => void): object {
        let callbacks = this._watchCallbacks;

        if (!callbacks) {
            const self = this;
            callbacks = this._watchCallbacks = function (name, oldValue, value, ignoreCatchall) {
                let notify = function (propertyCallbacks) {
                    if (propertyCallbacks) {
                        propertyCallbacks = propertyCallbacks.slice();
                        for (let i = 0, l = propertyCallbacks.length; i < l; i++) {
                            try {
                                propertyCallbacks[i].call(self, name, oldValue, value);
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                };
                notify(callbacks["_" + name]);
                if (!ignoreCatchall) {
                    notify(callbacks["*"]); // the catch-all
                }
            }; // we use a function instead of an object so it will be ignored by JSON conversion
        }
        if (!callback && typeof name === "function") {
            callback = name;
            name = "*";
        } else {
            // prepend with dash to prevent name conflicts with function (like "name" property)
            name = "_" + name;
        }
        let propertyCallbacks = callbacks[name];
        if (typeof propertyCallbacks !== "object") {
            propertyCallbacks = callbacks[name] = [];
        }
        propertyCallbacks.push(callback);

        let handle: any = {};
        handle.unwatch = handle.remove = function () {
            propertyCallbacks.splice( (propertyCallbacks || []).indexOf(callback), 1);
        };
        return handle;
    }
}

export { React_Stateful };
