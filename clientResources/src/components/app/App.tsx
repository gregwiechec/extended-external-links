import React, { useEffect, useState } from "react";
import { dataService as defaultDataService } from "../../data-service/data-service";
import { AggregatedDataItem, DataItem, DataService } from "../../definitions";
import { useServerSettingsContext } from "../../server-settings";
import AggregatedItemsList from "../aggregated-items-list/aggregated-items-list";
import DetailedItemsList from "../detailed-items-list/detailed-items-list";
import "./App.scss";

interface AppProps {
    dataService?: DataService;
}

const App = ({ dataService }: AppProps) => {
    if (!dataService) {
        dataService = defaultDataService;
    }

    const serverSettings = useServerSettingsContext();
    const [showDetails, setShowDetails] = useState(false);
    const [detailedItems, setDetailedItems] = useState<DataItem[]>([]);
    const [aggregatedItems, setAggregatedItems] = useState<AggregatedDataItem[]>([]);

    const onExport = () => {
        dataService?.loadItems().then((result) => {
            const csvContent =
                "data:text/csv;charset=utf-8," +
                (result || []).map((x) => x.contentName + "," + x.contentUrl + "," + x.externalLink).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "export.csv");
            document.body.appendChild(link); // Required for FF
            link.click(); // This will download the data file named "my_data.csv".
        });
    };

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
            <div>
                <label>
                    <input type="checkbox" checked={showDetails} onChange={(x) => setShowDetails(x.target.checked)} />
                    Show details
                </label>
            </div>
            <div>
                {showDetails ? (
                    <DetailedItemsList items={detailedItems} />
                ) : (
                    <AggregatedItemsList items={aggregatedItems} />
                )}
            </div>
            <div>
                <button className="external-links-button" style={{ marginRight: "8px" }} onClick={onExport}>Export</button>
                <a className="epi-functionLink" href="#" onClick={onRefresh}>Refresh</a>
            </div>
        </div>
    );
};

export default App;
