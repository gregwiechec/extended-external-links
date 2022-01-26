import { AggregatedDataItem, DataItem, DataService } from "../definitions";

export const fakeDataService: DataService = {
    loadItems: () => [],
    loadAggregatedItems: () => [],
    export: () => {
    }
};

const externalURLs = ["https://www.google.com", "http://microsoft.com", "https://www.amazon.com"];

export const getDetailedItems = (numberOfItems = 10): DataItem[] => {
    const contentNames = ["Start", "Alloy Plan", "Alloy Track", "Alloy Meet", "Events", "Release Notes", "News"];

    const result: DataItem[] = [];
    for (let i = 0; i < numberOfItems; i++) {
        result.push({
            externalLink: externalURLs[i % externalURLs.length],
            contentUrl: "https://optimizely.com",
            contentName: contentNames[i % contentNames.length]
        });
    }
    return result;
};

export const getAggregatedItems = (numberOfItems = 10): AggregatedDataItem[] => {
    const result: AggregatedDataItem[] = [];
    for (let i = 0; i < numberOfItems; i++) {
        const aggregatedItem: AggregatedDataItem = {
            externalLink: externalURLs[i % externalURLs.length] + (i < externalURLs.length ? "" : i),
            count: (i + 1) * 5
        };
        result.push(aggregatedItem);
    }
    return result;
};
