declare namespace epi {
    interface Dependency {
        resolve<T>(name: string): T;
    }

    interface ContextService {
        registerRoute(name: string, callback: (context: any, callerData: any) => void);
    }

    interface HashWrapper {
        onContextChange(context: any, callerData: any);
    }
}

declare module "epi/shell/command/_Command" {
    const _Command: any;
    export = _Command;
}


declare module "epi/_Module" {
    const _Module: any;
    export = _Module;
}

declare module "epi/dependency" {
    const dependency: epi.Dependency;
    export = dependency;
}
