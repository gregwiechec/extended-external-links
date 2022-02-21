import { AggregatedDataItem, DataItem, DataService } from "../definitions";

const externalURLs = ["https://www.google.com", "https://microsoft.com", "https://www.amazon.com"];

export const getDetailedItems = (numberOfItems = 10): DataItem[] => {
    const contentNames = ["Start", "Alloy Plan", "Alloy Track", "Alloy Meet", "Events", "Release Notes", "News"];

    const result: DataItem[] = [];
    for (let i = 0; i < numberOfItems; i++) {
        result.push({
            externalLink: externalURLs[i % externalURLs.length],
            contentName: contentNames[i % contentNames.length],
            contentLink: (i % contentNames.length).toString(),
            language: "en",
            publishDate: "2021-01-01"
        });
    }
    return result;
};

const convertDetailedItems = (numberOfItems: number): AggregatedDataItem[] => {
    const items = getDetailedItems(numberOfItems);
    const result: AggregatedDataItem[] = [];
    items.forEach(x => {
        let aggregatedItem = result.filter(a => a.externalLink === x.externalLink)[0];
        if (!aggregatedItem) {
            aggregatedItem = {
                externalLink: x.externalLink,
                count: 0,
                contents: [{
                    contentName: "Start Page",
                    contentLink: "1"
                }]
            }
            result.push(aggregatedItem);
        }
        aggregatedItem.count++;
    });
    return result;
};

export const getAggregatedItems = (numberOfItems = 10): AggregatedDataItem[] => {
    const result: AggregatedDataItem[] = [];
    for (let i = 0; i < numberOfItems; i++) {
        const aggregatedItem: AggregatedDataItem = {
            externalLink: externalURLs[i % externalURLs.length] + (i < externalURLs.length ? "" : i),
            count: (i + 1) * 5,
            contents: [
                { contentName: "Start Page", contentLink: "5" },
                { contentName: "Alloy Plan", contentLink: "10" }
            ]
        };
        result.push(aggregatedItem);
    }
    return result;
};

export const fakeDataService: DataService = {
    loadItems: () => new Promise(resolve => {
        resolve(getDetailedItems(50));
    }),
    loadAggregatedItems: () => new Promise(resolve => {
        resolve(convertDetailedItems(50));
    })
};
