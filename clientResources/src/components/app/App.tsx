import React, { useEffect, useState } from "react";
// @ts-ignore
import { Attention, Button, Code, Grid, GridCell, GridContainer } from "optimizely-oui";
import "./App.scss";
import { dataService as defaultDataService } from "../../data-service/data-service";
import { DataService } from "../../definitions";
import { useServerSettingsContext } from "../../server-settings";

interface AppProps {
    dataService?: DataService;
}

const App = ({ dataService }: AppProps) => {
  if (!dataService)  {
      dataService = defaultDataService;
  }

  const serverSettings = useServerSettingsContext();

  const onExport = () => {
      alert(1);
  };

  return (
    <GridContainer>
      <Grid>
        <GridCell large={12} medium={8} small={4}>
         <div>aaaaa</div>
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
