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

declare module "epi/dependency" {
    const dependency: epi.Dependency;
    export = dependency;
}
