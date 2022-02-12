import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { fakeDataService } from "../../data-service/fake-data-service";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import { DataItem, DataService } from "../../definitions";
import ExternalLinksList from "./external-links-list";

interface ComponentProps extends ServerSettings {
    dataService: DataService;
    onContentClick: (item: DataItem) => void;
}

const Component = (settings: ComponentProps) => {
    return (
        <ServerSettingsContext.Provider value={settings}>
            <div className="external-links-container">
                <ExternalLinksList onContentClick={settings.onContentClick} />
            </div>
        </ServerSettingsContext.Provider>
    );
};

export default {
    title: "External links list",
    component: Component
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

const getDefaultProps = (dataService: DataService) => {
    return {
        dataService: dataService,
        onContentClick: (item: DataItem) => alert(item.contentLink)
    };
};

export const ExternalLinksListStory = Template.bind({});
ExternalLinksListStory.args = getDefaultProps(fakeDataService);
