import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { fakeDataService } from "../../data-service/fake-data-service";
import { ServerSettingsContext, ServerSettings } from "../../server-settings";
import { DataItem, DataService } from "../../definitions";
import { ExternalLinksView } from "./external-links-view";

interface ComponentProps extends ServerSettings {
    dataService: DataService;
    onContentClick: (contentLink: string) => void;
}

const Component = (settings: ComponentProps) => {
    const closeCommand = {
        label: "Close",
        execute: () => alert("close")
    };

    return (
        <ServerSettingsContext.Provider value={settings}>
            <div className="external-links-container">
                <ExternalLinksView onContentClick={settings.onContentClick} closeCommand={closeCommand} />
            </div>
        </ServerSettingsContext.Provider>
    );
};

export default {
    title: "External links view",
    component: Component
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

const getDefaultProps = (dataService: DataService) => {
    return {
        dataService: dataService,
        onContentClick: (item: DataItem) => alert(item.contentLink)
    };
};

export const Default = Template.bind({});
Default.args = getDefaultProps(fakeDataService);
