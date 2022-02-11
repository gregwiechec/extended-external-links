import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { fakeDataService } from "../../data-service/fake-data-service";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import { DataItem, DataService } from "../../definitions";
import ExternalLinksComponent from "./external-links-component";

interface ComponentProps extends ServerSettings {
    dataService: DataService;
    onContentClick: (item: DataItem) => void;
}

const Component = (settings: ComponentProps) => {
    return (
        <ServerSettingsContext.Provider value={settings}>
            <ExternalLinksComponent />
        </ServerSettingsContext.Provider>
    );
};

export default {
    title: "External links component",
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
