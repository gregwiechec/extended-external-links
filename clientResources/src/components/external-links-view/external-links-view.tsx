import React, { useEffect, useState } from "react";
import { AggregatedDataItem, DataItem } from "../../definitions";
import { useServerSettingsContext } from "../../server-settings";
import { FilterableExternalLinksList } from "../external-links-list/external-links-list";
import { CommandButton } from "../external-links-list/command-button/comand-button";

interface ExternalLinksViewProps {
    onContentClick: (item: DataItem) => void;
    closeCommand: any;
}

export const ExternalLinksView = ({ onContentClick, closeCommand }: ExternalLinksViewProps) => {
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
            <div className="epi-localToolbar epi-viewHeaderContainer">
                <div className="epi-toolbarGroupContainer">
                    <div className="epi-toolbarGroup epi-toolbarTrailing">
                        <CommandButton command={closeCommand} />
                    </div>
                </div>
            </div>
            <div className="epi-content-approval__container">
                <hgroup className="epi-heading-group">
                    <h2 className="epi-heading">External links</h2>
                </hgroup>
                <FilterableExternalLinksList
                    showDetails={showDetails}
                    detailedItems={detailedItems}
                    aggregatedItems={aggregatedItems}
                    onShowDetailsChanged={(value) => setShowDetails(value)}
                    onContentClick={onContentClick}
                />
                <div>
                    <button className="dijitButton refresh-button" style={{ marginRight: "8px" }} onClick={onRefresh}>
                        Refresh
                    </button>
                    <a className="external-links-button" href="/ExternalLinks/export">
                        Export
                    </a>
                </div>
            </div>
        </>
    );
};
