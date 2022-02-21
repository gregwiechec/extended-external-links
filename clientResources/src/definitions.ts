export type DataItem = {
    externalLink: string;
    contentName: string;
    contentLink: string;
    language: string;
    publishDate: string;
};

export type AggregatedDataItem = {
    externalLink: string;
    count: number;
    contents: {
        contentName: string;
        contentLink: string;
    }[];
};

export type DataService = {
    loadItems: () => Promise<DataItem[]>;
    loadAggregatedItems: () => Promise<AggregatedDataItem[]>;
};
