import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { fakeDataService } from "../../data-service/fake-data-service";
import { ServerSettingsContext, ServerSettings } from "../../server-settings";
import { DataItem, DataService } from "../../definitions";
import { ExternalLinksListComponent } from "./external-links-component";
import { ResourcesContext, defaultResources } from "../../resources-context";

interface ComponentProps extends ServerSettings {
    dataService: DataService;
    onContentClick: (item: DataItem) => void;
}

const Component = (settings: ComponentProps) => {
    const topic: dojo.Topic = {
        subscribe(topic: string | dojo.ExtensionEvent, listener: EventListener | Function): dojo.Handle {
            return {
                remove: () => undefined
            };
        },
        publish(topic: string | dojo.ExtensionEvent, ...event): boolean {
            return true;
        }
    };

    return (
        <ResourcesContext.Provider value={defaultResources}>
            <ServerSettingsContext.Provider value={settings}>
                <div className="external-links-container">
                    <ExternalLinksListComponent onContentClick={settings.onContentClick} topic={topic} />
                </div>
            </ServerSettingsContext.Provider>
        </ResourcesContext.Provider>
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

export const Default = Template.bind({});
Default.args = getDefaultProps(fakeDataService);