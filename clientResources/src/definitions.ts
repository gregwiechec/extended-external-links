export type DataItem = {
    externalLink: string;
    contentName: string;
    contentUrl: string;
    contentLink: string;
};

export type AggregatedDataItem = {
    externalLink: string;
    count: number;
};

export type DataService = {
    loadItems: () => Promise<DataItem[]>;
    loadAggregatedItems: () => Promise<AggregatedDataItem[]>;
};
