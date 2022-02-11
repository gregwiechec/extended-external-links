import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {fakeDataService} from "../../data-service/fake-data-service";
import ServerSettingsContext, {ServerSettings} from "./../../server-settings";
import {DataItem, DataService} from "../../definitions";
import App from "./App";

interface ComponentProps extends ServerSettings {
    dataService: DataService;
    onContentClick: (item: DataItem) => void;
}

const Component = (settings: ComponentProps) => {
    return (
        <ServerSettingsContext.Provider value={settings}>
            <App dataService={settings.dataService} onContentClick={settings.onContentClick}/>
        </ServerSettingsContext.Provider>
    );
};

export default {
    title: "App",
    component: Component
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

const getDefaultProps = (dataService: DataService) => {
    return {
        dataService: dataService,
        onContentClick: (item: DataItem) => alert(item.contentLink)
    };
};

export const AppStory = Template.bind({});
AppStory.args = getDefaultProps(fakeDataService);
