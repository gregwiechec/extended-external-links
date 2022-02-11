export type DataItem = {
    externalLink: string;
    contentName: string;
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
