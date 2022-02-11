import { createContext, useContext } from "react";
import { DataService } from "./definitions";
import { dataService as defaultDataService } from "./data-service/data-service";

export type ServerSettings = {
    dataService: DataService;
};

const defaultSettings: ServerSettings = {
    dataService: defaultDataService
};

const ServerSettingsContext = createContext<ServerSettings>(defaultSettings);

export default ServerSettingsContext;

export const useServerSettingsContext = (): ServerSettings => {
    const serverSettingsContext = useContext(ServerSettingsContext);
    if (!serverSettingsContext) {
        throw new Error("serverSettingsContext must be used within the ServerSettingsContext.Provider");
    }
    return serverSettingsContext;
};
