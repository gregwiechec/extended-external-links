import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DetailedItemsList } from "./detailed-items-list";
import { getDetailedItems } from "../../../data-service/fake-data-service";
import "./../external-links-list.scss";

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
export default {
    title: "Components/Details",
    component: DetailedItemsList
} as ComponentMeta<typeof DetailedItemsList>;

const Template: ComponentStory<typeof DetailedItemsList> = (args) => <DetailedItemsList onContentClick={contentLink => alert(contentLink)} {...args} />;

export const DetailedItemListStory = Template.bind({});
DetailedItemListStory.args = {
    items: getDetailedItems()
};

export const WithExtraColumns = Template.bind({});
WithExtraColumns.args = {
    items: getDetailedItems(),
    showExtraColumns: true
};

export const DetailedItemListStoryLong = Template.bind({});
DetailedItemListStoryLong.args = {
    items: getDetailedItems(100)
};
