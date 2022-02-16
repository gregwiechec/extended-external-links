import React from "react";
import { AggregatedDataItem, DataItem } from "../../definitions";
import AggregatedItemsList from "./aggregated-items-list/aggregated-items-list";
import DetailedItemsList from "./detailed-items-list/detailed-items-list";
import "./external-links-list.scss";

interface FilterableExternalLinksListProps {
    showDetails: boolean;
    detailedItems: DataItem[];
    aggregatedItems: AggregatedDataItem[];
    onShowDetailsChanged: (showDetails: boolean) => void;
    onContentClick: (item: DataItem) => void;
}

// searchable list of external links
export const FilterableExternalLinksList = ({
    showDetails,
    detailedItems,
    aggregatedItems,
    onShowDetailsChanged,
    onContentClick
}: FilterableExternalLinksListProps) => {
    return (
        <>
            <div className="filters">
                <label>
                    <input
                        type="checkbox"
                        checked={showDetails}
                        onChange={(x) => onShowDetailsChanged(x.target.checked)}
                    />
                    Show details
                </label>
            </div>
            {showDetails ? (
                <DetailedItemsList items={detailedItems} onContentClick={onContentClick} />
            ) : (
                <AggregatedItemsList items={aggregatedItems} />
            )}
        </>
    );
};

//TODO: LINKS fix issue when reloading the page
//TODO: LINKS hide button when reloading the page
