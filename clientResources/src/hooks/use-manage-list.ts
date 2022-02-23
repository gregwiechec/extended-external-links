import { useEffect, useState } from "react";
import { AggregatedDataItem, DataItem, DataService } from "../definitions";

export interface UseManageListResult {
    showDetails: boolean;
    filteredDetailedItems: DataItem[];
    filteredAggregatedItems: AggregatedDataItem[];
    onRefresh: (e?: any) => void;
    setShowDetails: (value: boolean) => void;
    externalUrl: string;
    onExternalUrlChanged: (value: string) => void;
}

export const useManageList = (dataService: DataService, showDetailsDefault = false): UseManageListResult => {
    const [showDetails, setShowDetails] = useState(showDetailsDefault);
    const [detailedItems, setDetailedItems] = useState<DataItem[]>([]);
    const [filteredDetailedItems, setFilteredDetailedItems] = useState<DataItem[]>([]);
    const [aggregatedItems, setAggregatedItems] = useState<AggregatedDataItem[]>([]);
    const [filteredAggregatedItems, setFilteredAggregatedItems] = useState<AggregatedDataItem[]>([]);
    const [externalUrl, setExternalUrl] = useState("");

    const onRefresh = (e: any = null) => {
        if (e) {
            e.preventDefault();
        }

        if (showDetails) {
            dataService.loadItems().then((result) => {
                setDetailedItems(result);
                setFilteredDetailedItems(result);
                setFilteredAggregatedItems(aggregatedItems);
            });
        } else {
            dataService.loadAggregatedItems().then((result) => {
                setAggregatedItems(result);
                setFilteredDetailedItems(detailedItems);
                setFilteredAggregatedItems(result);
            });
        }
    };

    useEffect(() => {
        setFilteredDetailedItems(
            (detailedItems || []).filter((x) => x.externalLink.toLowerCase().indexOf(externalUrl) !== -1)
        );
        setFilteredAggregatedItems(
            (aggregatedItems || []).filter((x) => x.externalLink.toLowerCase().indexOf(externalUrl) !== -1)
        );
    }, [externalUrl]);

    const onExternalUrlChanged = (value: string) => {
        setExternalUrl(value);
    };

    useEffect(() => {
        setExternalUrl("");
        onRefresh(null);
    }, [showDetails]);

    return {
        showDetails,
        filteredDetailedItems,
        filteredAggregatedItems,
        onRefresh,
        setShowDetails,
        externalUrl,
        onExternalUrlChanged
    };
};
