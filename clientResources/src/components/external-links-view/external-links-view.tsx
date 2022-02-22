import React, { useEffect } from "react";
import { FilterableExternalLinksList } from "../external-links-list/external-links-list";
import { CommandButton } from "../external-links-list/command-button/comand-button";
import { useResourcesContext } from "../../resources-context";
import { useManageList } from "../../hooks";
import { useServerSettingsContext } from "../../server-settings";

interface ExternalLinksViewProps {
    onContentClick: (contentLink: string) => void;
    closeCommand: any;
}

export const ExternalLinksView = ({ onContentClick, closeCommand }: ExternalLinksViewProps) => {
    const resources = useResourcesContext();
    const settings = useServerSettingsContext();
    const {
        showDetails,
        filteredDetailedItems,
        filteredAggregatedItems,
        onRefresh,
        setShowDetails,
        externalUrl,
        onExternalUrlChanged
    } = useManageList(settings.dataService);

    useEffect(() => {
        onRefresh(null);
    }, []);

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
                    externalUrl={externalUrl}
                    onExternalUrlChanged={onExternalUrlChanged}
                    detailedItems={filteredDetailedItems}
                    aggregatedItems={filteredAggregatedItems}
                    onShowDetailsChanged={setShowDetails}
                    onContentClick={onContentClick}
                    showExtraColumns
                />
                <div>
                    <button className="dijitButton refresh-button" style={{ marginRight: "8px" }} onClick={onRefresh}>
                        {resources.refresh}
                    </button>
                    <a className="external-links-button" href={settings.externalLinksControllerUrl + "/Export"}>
                        {resources.export}
                    </a>
                </div>
            </div>
        </>
    );
};
