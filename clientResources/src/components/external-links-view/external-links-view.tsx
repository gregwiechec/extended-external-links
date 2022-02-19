import React from "react";
import { DataItem } from "../../definitions";
import { FilterableExternalLinksList } from "../external-links-list/external-links-list";
import { CommandButton } from "../external-links-list/command-button/comand-button";
import { useResourcesContext } from "../../resources-context";
import { useManageList } from "../../hooks";

interface ExternalLinksViewProps {
    onContentClick: (item: DataItem) => void;
    closeCommand: any;
}

export const ExternalLinksView = ({ onContentClick, closeCommand }: ExternalLinksViewProps) => {
    const resources = useResourcesContext();
    const { showDetails, detailedItems, aggregatedItems, onRefresh, setShowDetails } = useManageList();

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
                    <h2 className="epi-heading">{resources.component.title}</h2>
                </hgroup>
                <FilterableExternalLinksList
                    showDetails={showDetails}
                    detailedItems={detailedItems}
                    aggregatedItems={aggregatedItems}
                    onShowDetailsChanged={setShowDetails}
                    onContentClick={onContentClick}
                />
                <div>
                    <button className="dijitButton refresh-button" style={{ marginRight: "8px" }} onClick={onRefresh}>
                        {resources.refresh}
                    </button>
                    <a className="external-links-button" href="/ExternalLinks/export">
                        {resources.export}
                    </a>
                </div>
            </div>
        </>
    );
};
