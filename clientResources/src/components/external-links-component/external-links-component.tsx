import React, { useEffect } from "react";
import { FilterableExternalLinksList } from "../external-links-list/external-links-list";
import { useManageList } from "../../hooks";
import { useServerSettingsContext } from "../../server-settings";

interface ExternalLinksListComponentProps {
    onContentClick: (contentLink: string) => void;
    topic: dojo.Topic;
}

export const ExternalLinksListComponent = ({ onContentClick, topic }: ExternalLinksListComponentProps) => {
    const serverSettings = useServerSettingsContext();
    const {
        showDetails,
        filteredDetailedItems,
        filteredAggregatedItems,
        onRefresh,
        setShowDetails,
        externalUrl,
        onExternalUrlChanged
    } = useManageList(serverSettings.dataService, true);

    useEffect(() => {
        onRefresh();

        let handle = topic.subscribe("/external-links/reload", () => {
            onRefresh(null);
        });
        return () => {
            handle.remove();
            handle = null;
        };
    }, []);

    return (
        <>
            <FilterableExternalLinksList
                showDetails={showDetails}
                externalUrl={externalUrl}
                onExternalUrlChanged={onExternalUrlChanged}
                detailedItems={filteredDetailedItems}
                aggregatedItems={filteredAggregatedItems}
                onShowDetailsChanged={setShowDetails}
                onContentClick={onContentClick}
                allowAggregatedView={false}
            />
        </>
    );
};
