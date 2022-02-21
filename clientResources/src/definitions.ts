export interface DataItem {
    externalLink: string;
    contentName: string;
    contentLink: string;
    language: string;
    publishDate: string;
}

export interface AggregatedDataItem {
    externalLink: string;
    count: number;
    contents: {
        contentName: string;
        contentLink: string;
    }[];
}

export interface DataService {
    loadItems: () => Promise<DataItem[]>;
    loadAggregatedItems: () => Promise<AggregatedDataItem[]>;
}
