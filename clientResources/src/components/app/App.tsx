import React, { useEffect, useState } from "react";
// @ts-ignore
import { Attention, Button, Checkbox, Code, Grid, GridCell, GridContainer } from "optimizely-oui";
import "./App.scss";
import { dataService as defaultDataService } from "../../data-service/data-service";
import { AggregatedDataItem, DataItem, DataService } from "../../definitions";
import { useServerSettingsContext } from "../../server-settings";
import AggregatedItemsList from "../aggregated-items-list/aggregated-items-list";
import DetailedItemsList from "../detailed-items-list/detailed-items-list";

interface AppProps {
    dataService?: DataService;
}

const App = ({ dataService }: AppProps) => {
    if (!dataService)  {
        dataService = defaultDataService;
    }

    const serverSettings = useServerSettingsContext();
    const [showDetails, setShowDetails] = useState(false);
    const [detailedItems, setDetailedItems] = useState<DataItem[]>([]);
    const [aggregatedItems, setAggregatedItems] = useState<AggregatedDataItem[]>([]);

    const onExport = () => {
        alert(1);
    };

    useEffect(() => {
        if (showDetails) {
            dataService?.loadItems().then(result => setDetailedItems(result));
        } else {
            dataService?.loadAggregatedItems().then(result => setAggregatedItems(result));
        }
    }, [showDetails])

    return (
        <GridContainer>
            <Grid>
                <GridCell large={12} medium={8} small={4}>
                    <Checkbox checked={showDetails} label="Show details"
                              onChange={x => setShowDetails(x.target.checked)} />
                </GridCell>
                <GridCell large={12} medium={8} small={4}>
                    {showDetails ? <DetailedItemsList items={detailedItems} /> : <AggregatedItemsList items={aggregatedItems} />}
                </GridCell>
                <GridCell large={12} medium={8} small={4}>
                    <Button
                        className="add-configuration-button"
                        style="highlight"
                        size="narrow"
                        leftIcon="add"
                        onClick={onExport}
                    >
                        Add configuration
                    </Button>
                </GridCell>
            </Grid>
        </GridContainer>
    );
};

export default App;
