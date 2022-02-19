import { createContext, useContext } from "react";

export interface Resources {
    "component": {
        "description": string;
        "title": string;
    };
    "common": {
        "hits": string;
        "host": string;
    };
    "details": {
        "content": string;
        "link": string;
        "page": string;
        "contentlanguage": string;
        "publishdate": string;
    };
    "showdetails": string;
    "showview": string;
    "refresh": string;
    "export": string;
}

const defaultResources: Resources = {
    "component": {
        "description": "Lists all external links used on the site",
        "title": "External links"
    },
    "common": {
        "hits": "Number of linking content items",
        "host": "Web Address"
    },
    "details": {
        "content": "Content",
        "link": "Web Address",
        "page": "Page",
        "contentlanguage": "Language",
        "publishdate": "Publish date"
    },
    "showdetails": "Show details",
    "showview": "Show view",
    "refresh": "Refresh",
    "export": "Export"
};

const ResourcesContext = createContext<Resources>(defaultResources);

export { ResourcesContext };

export const useResourcesContext = (): Resources => {
    const resources = useContext(ResourcesContext);
    if (!resources) {
        throw new Error("resources must be used within the ResourcesContext.Provider");
    }
    return resources;
};
