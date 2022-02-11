import { createContext, useContext } from "react";

export type ServerSettings = {
}

const defaultSettings: ServerSettings = {
};

const ServerSettingsContext = createContext<ServerSettings>(defaultSettings);

export default ServerSettingsContext;

export const useServerSettingsContext = (): ServerSettings => {
    const serverSettingsContext = useContext(ServerSettingsContext);
    if (!serverSettingsContext) {
        throw new Error('serverSettingsContext must be used within the ServerSettingsContext.Provider');
    }
    return serverSettingsContext;
};
