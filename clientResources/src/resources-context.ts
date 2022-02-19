import { createContext, useContext } from "react";

export type Resources = {
    "component": {
        "description": string,
        "title": string
    },
    "common": {
        "hits": string,
        "host": string
    },
    "details": {
        "content": string,
        "link": string,
        "page": string
    },
    "showdetails": string
};

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
        "page": "Page"
    },
    "showdetails": "Show details"
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
