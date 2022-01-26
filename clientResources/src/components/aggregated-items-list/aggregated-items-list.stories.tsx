import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AggregatedItemsList from "./aggregated-items-list";
import "./../app/App.scss";
import { getAggregatedItems } from "../../data-service/fake-data-service";

export default {
    title: "List/Aggregated",
    component: AggregatedItemsList
} as ComponentMeta<typeof AggregatedItemsList>;

const Template: ComponentStory<typeof AggregatedItemsList> = (args) => <AggregatedItemsList {...args} />;

export const AggregatedItemListStory = Template.bind({});
AggregatedItemListStory.args = {
    items: getAggregatedItems()
};

export const AggregatedItemListStoryLong = Template.bind({});
AggregatedItemListStoryLong.args = {
    items: getAggregatedItems(100)
};
