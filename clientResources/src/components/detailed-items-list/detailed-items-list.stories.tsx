import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DetailedItemsList from "./detailed-items-list";
import "./../app/App.scss";
import { getDetailedItems } from "../../data-service/fake-data-service";

export default {
    title: "List/Details",
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
