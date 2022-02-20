import { useEffect, useState } from "react";
import { AggregatedDataItem, DataItem } from "../definitions";
import { useServerSettingsContext } from "../server-settings";

export const useManageList = (showDetailsDefault = false) => {
    const serverSettings = useServerSettingsContext();

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

        showDetails ? serverSettings.dataService.loadItems : serverSettings.dataService.loadAggregatedItems;

        if (showDetails) {
            serverSettings.dataService.loadItems().then((result) => {
                setDetailedItems(result);
                setFilteredDetailedItems(result);
                setFilteredAggregatedItems(aggregatedItems);
            });
        } else {
            serverSettings.dataService.loadAggregatedItems().then((result) => {
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

    useEffect(() => {
        onRefresh(null);
    }, []);

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
