import { createContext, useContext } from "react";
import { DataService } from "./definitions";
import { dataService as defaultDataService } from "./data-service/data-service";

export interface ServerSettings {
    dataService: DataService;
}

const defaultSettings: ServerSettings = {
    dataService: defaultDataService
};

const ServerSettingsContext = createContext<ServerSettings>(defaultSettings);

export { ServerSettingsContext };

export const useServerSettingsContext = (): ServerSettings => {
    const serverSettingsContext = useContext(ServerSettingsContext);
    if (!serverSettingsContext) {
        throw new Error("serverSettingsContext must be used within the ServerSettingsContext.Provider");
    }
    return serverSettingsContext;
};
