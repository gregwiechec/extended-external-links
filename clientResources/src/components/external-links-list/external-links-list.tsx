import React, { useEffect, useState } from "react";
import { AggregatedDataItem, DataItem } from "../../definitions";
import { useServerSettingsContext } from "../../server-settings";
import AggregatedItemsList from "./aggregated-items-list/aggregated-items-list";
import DetailedItemsList from "./detailed-items-list/detailed-items-list";
import "./external-links-list.scss";

interface AppProps {
    onContentClick: (item: DataItem) => void;
}

// searchable list of external links
const ExternalLinksList = ({ onContentClick }: AppProps) => {
    const serverSettings = useServerSettingsContext();
    const [showDetails, setShowDetails] = useState(false);
    const [detailedItems, setDetailedItems] = useState<DataItem[]>([]);
    const [aggregatedItems, setAggregatedItems] = useState<AggregatedDataItem[]>([]);

    useEffect(() => {
        onRefresh(null);
    }, [showDetails]);

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

    return (
        <>
            <div className="filters">
                <label>
                    <input type="checkbox" checked={showDetails} onChange={(x) => setShowDetails(x.target.checked)} />
                    Show details
                </label>
            </div>
            {showDetails ? (
                <DetailedItemsList items={detailedItems} onContentClick={onContentClick} />
            ) : (
                <AggregatedItemsList items={aggregatedItems} />
            )}
            <div>
                <button className="dijitButton refresh-button" style={{ marginRight: "8px" }} onClick={onRefresh}>
                    Refresh
                </button>
                <a className="external-links-button" href="/ExternalLinks/export">
                    Export
                </a>
            </div>
        </>
    );
};

export default ExternalLinksList;

//TODO: LINKS fix issue when reloading the page
//TODO: LINKS hide button when reloading the page
