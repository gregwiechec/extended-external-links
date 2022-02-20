import React from "react";
import { AggregatedDataItem, DataItem } from "../../definitions";
import AggregatedItemsList from "./aggregated-items-list/aggregated-items-list";
import { DetailedItemsList } from "./detailed-items-list/detailed-items-list";
import { useResourcesContext } from "../../resources-context";
import "./external-links-list.scss";

interface FilterableExternalLinksListProps {
    showDetails: boolean;
    externalUrl: string;
    onExternalUrlChanged: (target: any) => void;
    detailedItems: DataItem[];
    aggregatedItems: AggregatedDataItem[];
    onShowDetailsChanged: (showDetails: boolean) => void;
    onContentClick: (item: DataItem) => void;
    showExtraColumns?: boolean;
    allowAggregatedView?: boolean;
}

// searchable list of external links
export const FilterableExternalLinksList = ({
    showDetails,
    externalUrl,
    onExternalUrlChanged,
    detailedItems,
    aggregatedItems,
    onShowDetailsChanged,
    onContentClick,
    showExtraColumns = false,
    allowAggregatedView = true
}: FilterableExternalLinksListProps) => {
    const resources = useResourcesContext();

    return (
        <>
            <div className="filters">
                <input type="text" placeholder="External URL" value={externalUrl} onChange={e => onExternalUrlChanged(e.target.value)} />
                {allowAggregatedView && (
                    <label>
                        <input
                            type="checkbox"
                            checked={showDetails}
                            onChange={(x) => onShowDetailsChanged(x.target.checked)}
                        />
                        {resources.showdetails}
                    </label>
                )}
            </div>
            {showDetails ? (
                <DetailedItemsList
                    items={detailedItems}
                    onContentClick={onContentClick}
                    showExtraColumns={showExtraColumns}
                />
            ) : (
                <AggregatedItemsList items={aggregatedItems} />
            )}
        </>
    );
};

//TODO: LINKS fix issue when reloading the page
//TODO: LINKS hide button when reloading the page
