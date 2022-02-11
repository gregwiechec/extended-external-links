import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DetailedItemsList from "./detailed-items-list";
import { getDetailedItems } from "../../../data-service/fake-data-service";
import "./../external-links-list.scss";

export default {
    title: "External links list/Details",
    component: DetailedItemsList
} as ComponentMeta<typeof DetailedItemsList>;

const Template: ComponentStory<typeof DetailedItemsList> = (args) => <DetailedItemsList {...args} />;

export const DetailedItemListStory = Template.bind({});
DetailedItemListStory.args = {
    items: getDetailedItems()
};

export const DetailedItemListStoryLong = Template.bind({});
DetailedItemListStoryLong.args = {
    items: getDetailedItems(100)
};