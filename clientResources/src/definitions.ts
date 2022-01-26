export type DataItem = {
    externalLink: string;
    contentName: string;
    contentUrl: string;
};

export type AggregatedDataItem = {
    externalLink: string;
    count: number;
};

export type DataService = {
    loadItems: () => DataItem[];
    loadAggregatedItems: () => AggregatedDataItem[];
    export: () => void;
};
