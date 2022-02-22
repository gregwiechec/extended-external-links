declare namespace epi {
    interface ApplicationSettings {
        externalLinksControllerUrl: string;
    }
}

declare module "epi/shell/command/_WidgetCommandProviderMixin" {
    const _WidgetCommandProviderMixin: any;
    export = _WidgetCommandProviderMixin;
}

declare module "epi-cms/content-approval/command/CancelChanges" {
    const CancelChanges: any;
    export = CancelChanges;
}

declare module "epi/i18n!epi/cms/nls/externallinks" {
    const resources: any;
    export = resources;
}

declare module "epi-cms/ApplicationSettings" {
    const settings: epi.ApplicationSettings;
    export = settings;
}
