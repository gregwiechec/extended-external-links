import React, { useEffect } from "react";
import { DataItem } from "../../definitions";
import { FilterableExternalLinksList } from "../external-links-list/external-links-list";
import { useManageList } from "../../hooks";

interface ExternalLinksListComponentProps {
    onContentClick: (item: DataItem) => void;
    topic: dojo.Topic;
}

export const ExternalLinksListComponent = ({ onContentClick, topic }: ExternalLinksListComponentProps) => {
    const { showDetails, detailedItems, aggregatedItems, onRefresh, setShowDetails } = useManageList();

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
                detailedItems={detailedItems}
                aggregatedItems={aggregatedItems}
                onShowDetailsChanged={setShowDetails}
                onContentClick={onContentClick}
            />
        </>
    );
};
