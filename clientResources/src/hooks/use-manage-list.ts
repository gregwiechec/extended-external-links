import { useEffect, useState } from "react";
import { AggregatedDataItem, DataItem } from "../definitions";
import { useServerSettingsContext } from "../server-settings";

export const useManageList = () => {
    const serverSettings = useServerSettingsContext();

    const [showDetails, setShowDetails] = useState(false);
    const [detailedItems, setDetailedItems] = useState<DataItem[]>([]);
    const [aggregatedItems, setAggregatedItems] = useState<AggregatedDataItem[]>([]);

    const onRefresh = (e: any = null) => {
        if (e) {
            e.preventDefault();
        }
        if (showDetails) {
            serverSettings.dataService.loadItems().then((result) => setDetailedItems(result));
        } else {
            serverSettings.dataService.loadAggregatedItems().then((result) => setAggregatedItems(result));
        }
    };

    useEffect(() => {
        onRefresh(null);
    }, [showDetails]);

    return { showDetails, detailedItems, aggregatedItems, onRefresh, setShowDetails };
};
