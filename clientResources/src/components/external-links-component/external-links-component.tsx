import React, { useEffect, useState } from "react";
import { AggregatedDataItem, DataItem } from "../../definitions";
import { useServerSettingsContext } from "../../server-settings";
import { FilterableExternalLinksList } from "../external-links-list/external-links-list";

interface ExternalLinksListComponentProps {
    onContentClick: (item: DataItem) => void;
    topic: dojo.Topic;
}

export const ExternalLinksListComponent = ({ onContentClick, topic }: ExternalLinksListComponentProps) => {
    const serverSettings = useServerSettingsContext();
    const [showDetails, setShowDetails] = useState(false);
    const [detailedItems, setDetailedItems] = useState<DataItem[]>([]);
    const [aggregatedItems, setAggregatedItems] = useState<AggregatedDataItem[]>([]);

    useEffect(() => {
        onRefresh(null);
    }, [showDetails]);

    useEffect(() => {
        let handle = topic.subscribe("/external-links/reload", () => {
            onRefresh(null);
        });
        return () => {
            handle.remove();
            handle = null;
        };
    });

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
            <FilterableExternalLinksList
                showDetails={showDetails}
                detailedItems={detailedItems}
                aggregatedItems={aggregatedItems}
                onShowDetailsChanged={(value) => setShowDetails(value)}
                onContentClick={onContentClick}
            />
        </>
    );
};
