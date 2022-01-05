import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { fakeDataService } from "../../data-service/fake-data-service";
import ServerSettingsContext, { ServerSettings } from "./../../server-settings";
import { DataService } from "../../definitions";
import App from "./App";

interface ComponentProps extends ServerSettings {
  dataService: DataService;
}

const Component = (settings: ComponentProps) => {
  return (
    <ServerSettingsContext.Provider value={settings}>
      <App dataService={settings.dataService} />
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
    contentUrl: "http://google.com/{contentLink}"
  };
};

export const AppStory = Template.bind({});
AppStory.args = getDefaultProps(fakeDataService);
