import React, { useEffect, useState } from "react";
import { dataService as defaultDataService } from "../../data-service/data-service";
import { AggregatedDataItem, DataItem, DataService } from "../../definitions";
import { useServerSettingsContext } from "../../server-settings";
import AggregatedItemsList from "./aggregated-items-list/aggregated-items-list";
import DetailedItemsList from "./detailed-items-list/detailed-items-list";
import "./external-links-list.scss";

interface AppProps {
    dataService?: DataService;
    onContentClick: (item: DataItem) => void;
}

// searchable list of external links
const ExternalLinksList = ({ dataService, onContentClick }: AppProps) => {
    if (!dataService) {
        dataService = defaultDataService;
    }

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
            dataService?.loadItems().then((result) => setDetailedItems(result));
        } else {
            dataService?.loadAggregatedItems().then((result) => setAggregatedItems(result));
        }
    };

    return (
        <div className="external-links-container">
            <hgroup className="epi-heading-group">
                <h2 className="epi-heading">External links</h2>
            </hgroup>
            <div className="filters">
                <label>
                    <input type="checkbox" checked={showDetails} onChange={(x) => setShowDetails(x.target.checked)} />
                    Show details
                </label>
            </div>
            <div>
                {showDetails ? (
                    <DetailedItemsList items={detailedItems} onContentClick={onContentClick} />
                ) : (
                    <AggregatedItemsList items={aggregatedItems} />
                )}
            </div>
            <div>
                <button className="dijitButton refresh-button" style={{ marginRight: "8px" }} onClick={onRefresh}>Refresh</button>
                <a className="external-links-button" href="/ExternalLinks/export">Export</a>
            </div>
        </div>
    );
};

export default ExternalLinksList;

//TODO: LINKS fix issue when reloading the page
//TODO: LINKS hide button when reloading the page
