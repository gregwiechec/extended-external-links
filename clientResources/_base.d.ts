//https://github.com/dojo/typings/blob/663fa35d1c46533c3b4294f93987d65caab65da7/dojo/1.11/_base.d.ts

declare namespace dojo {
    namespace _base {
        /* dojo/_base/declare */

        /**
         * dojo/_base/declare() returns a constructor `C`.   `new C()` returns an Object with the following
         * methods, in addition to the methods and properties specified via the arguments passed to declare().
         */
        interface DeclareCreatedObject {
            declaredClass: string;

            /**
             * Calls a super method.
             *
             * This method is used inside method of classes produced with
             * declare() to call a super method (next in the chain). It is
             * used for manually controlled chaining. Consider using the regular
             * chaining, because it is faster. Use "this.inherited()" only in
             * complex cases.
             *
             * This method cannot me called from automatically chained
             * constructors including the case of a special (legacy)
             * constructor chaining. It cannot be called from chained methods.
             *
             * If "this.inherited()" cannot find the next-in-chain method, it
             * does nothing and returns "undefined". The last method in chain
             * can be a default method implemented in Object, which will be
             * called last.
             *
             * If "name" is specified, it is assumed that the method that
             * received "args" is the parent method for this call. It is looked
             * up in the chain list and if it is found the next-in-chain method
             * is called. If it is not found, the first-in-chain method is
             * called.
             *
             * If "name" is not specified, it will be derived from the calling
             * method (using a methoid property "nom").
             */
            inherited<U>(args: IArguments, newArgs?: any[]): U;
            inherited(args: IArguments, newArgs?: true): Function | void;
            inherited<U>(name: string, args: IArguments, newArgs?: any[]): U;
            inherited(name: string, args: IArguments, newArgs?: true): Function | void;

            /**
             * Returns a super method.
             *
             * This method is a convenience method for "this.inherited()".
             * It uses the same algorithm but instead of executing a super
             * method, it returns it, or "undefined" if not found.
             */
            getInherited(args: IArguments): Function | void;
            getInherited(name: string, args: IArguments): Function | void;

            /**
             * Checks the inheritance chain to see if it is inherited from this class.
             *
             * This method is used with instances of classes produced with
             * declare() to determine of they support a certain interface or
             * not. It models "instanceof" operator.
             */
            isInstanceOf(cls: any): boolean;
        }

        interface DeclareConstructor<T> {
            new (...args: any[]): T & DeclareCreatedObject;
            prototype: T;

            /**
             * Adds all properties and methods of source to constructor's
             * prototype, making them available to all instances created with
             * constructor. This method is specific to constructors created with
             * declare().
             *
             * Adds source properties to the constructor's prototype. It can
             * override existing properties.
             *
             * This method is similar to dojo.extend function, but it is specific
             * to constructors produced by declare(). It is implemented
             * using dojo.safeMixin, and it skips a constructor property,
             * and properly decorates copied functions.
             */
            extend<U>(source: U): DeclareConstructor<T & U>;

            /**
             * Create a subclass of the declared class from a list of base classes.
             *
             * Create a constructor using a compact notation for inheritance and
             * prototype extension.
             *
             * Mixin ancestors provide a type of multiple inheritance.
             * Prototypes of mixin ancestors are copied to the new class:
             * changes to mixin prototypes will not affect classes to which
             * they have been mixed in.
             */
            createSubclass<U, V, X>(mixins: [DeclareConstructor<U>, DeclareConstructor<V>], props: X & ThisType<T & U & V & X>): DeclareConstructor<T & U & V & X>;
            createSubclass<U, V>(mixins: [DeclareConstructor<U>], props: V & ThisType<T & U & V>): DeclareConstructor<T & U & V>;
            createSubclass<U, V>(mixins: DeclareConstructor<U>, props: V & ThisType<T & U & V>): DeclareConstructor<T & U & V>;
            createSubclass<U>(mixins: [DeclareConstructor<U>]): DeclareConstructor<T & U>;
            createSubclass<U>(mixins: DeclareConstructor<U>): DeclareConstructor<T & U>;
            createSubclass<U>(mixins: any, props: U & ThisType<T & U>): DeclareConstructor<T & U>;
        }

        /**
         * Create a feature-rich constructor from compact notation.
         */
        interface Declare {
            <A, B, C, D>(superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>, DeclareConstructor<D>]): DeclareConstructor<A & B & C & D>;
            <A, B, C>(superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>]): DeclareConstructor<A & B & C>;
            <A, B>(superClass: [DeclareConstructor<A>, DeclareConstructor<B>]): DeclareConstructor<A & B>;
            <A>(superClass: DeclareConstructor<A> | [DeclareConstructor<A>]): DeclareConstructor<A>;

            <A, B, C, D, E>(superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>, DeclareConstructor<D>], props: E & ThisType<DeclareCreatedObject & A & B & C & D & E>): DeclareConstructor<A & B & C & D & E>;
            <A, B, C, D>(superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>], props: D & ThisType<DeclareCreatedObject & A & B & C & D>): DeclareConstructor<A & B & C & D>;
            <A, B, C>(superClass: [DeclareConstructor<A>, DeclareConstructor<B>], props: C & ThisType<DeclareCreatedObject & A & B & C>): DeclareConstructor<A & B & C>;
            <A, B>(superClass: DeclareConstructor<A> | [DeclareConstructor<A>], props: B & ThisType<DeclareCreatedObject & A & B>): DeclareConstructor<A & B>;

            <A, B, C, D>(className: string, superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>, DeclareConstructor<D>]): DeclareConstructor<A & B & C & D>;
            <A, B, C>(className: string, superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>]): DeclareConstructor<A & B & C>;
            <A, B>(className: string, superClass: [DeclareConstructor<A>, DeclareConstructor<B>]): DeclareConstructor<A & B>;
            <A>(className: string, superClass: DeclareConstructor<A> | [DeclareConstructor<A>]): DeclareConstructor<A>;

            <A, B, C, D, E>(className: string, superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>, DeclareConstructor<D>], props: E & ThisType<DeclareCreatedObject & A & B & C & D & E>): DeclareConstructor<A & B & C & D & E>;
            <A, B, C, D>(className: string, superClass: [DeclareConstructor<A>, DeclareConstructor<B>, DeclareConstructor<C>], props: D & ThisType<DeclareCreatedObject & A & B & C & D>): DeclareConstructor<A & B & C & D>;
            <A, B, C>(className: string, superClass: [DeclareConstructor<A>, DeclareConstructor<B>], props: C & ThisType<DeclareCreatedObject & A & B & C>): DeclareConstructor<A & B & C>;
            <A, B>(className: string, superClass: DeclareConstructor<A> | [DeclareConstructor<A>], props: B & ThisType<DeclareCreatedObject & A & B>): DeclareConstructor<A & B>;

            <A>(className: string, superClass: any, props: A & ThisType<DeclareCreatedObject & A>): DeclareConstructor<A>;
            (className: string, superClass: any): DeclareConstructor<any>;
            <A>(superClass: any, props: A & ThisType<DeclareCreatedObject & A>): DeclareConstructor<A>;
            (superClass: any): DeclareConstructor<any>;

            /**
             * Mix in properties skipping a constructor and decorating functions
             * like it is done by declare().
             */
            safeMixin<A, B>(target: A, source: B): A & B;
        }
    }
}
