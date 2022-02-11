import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AggregatedItemsList from "./aggregated-items-list";
import { getAggregatedItems } from "../../../data-service/fake-data-service";
import "./../external-links-list.scss";

export default {
    title: "External links list/Aggregated",
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