import React, { useEffect } from "react";
import { FilterableExternalLinksList } from "../external-links-list/external-links-list";
import { useManageList } from "../../hooks";

interface ExternalLinksListComponentProps {
    onContentClick: (contentLink: string) => void;
    topic: dojo.Topic;
}

export const ExternalLinksListComponent = ({ onContentClick, topic }: ExternalLinksListComponentProps) => {
    const {
        showDetails,
        filteredDetailedItems,
        filteredAggregatedItems,
        onRefresh,
        setShowDetails,
        externalUrl,
        onExternalUrlChanged
    } = useManageList(true);

    useEffect(() => {
        let handle = topic.subscribe("/external-links/reload", () => {
            onRefresh(null);
        });
        return () => {
            handle.remove();
            handle = null;
        };
    });

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
