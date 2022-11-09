import { Grid, Switch } from "@mui/material";
import { useState } from "react";
import { useSummaryData } from "../../Domain/hooks/useSummaryData";
import { SummaryChart } from "./SummaryChart/SummaryChart";
import { SummaryTable } from "./SummaryTable/SummaryTable";
export const Summary = () => {
  const summaryData = useSummaryData();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const summary = checked ? (
    <SummaryChart summaryData={summaryData} />
  ) : (
    <SummaryTable summaryData={summaryData} />
  );
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>
      {summary}
    </>
  );
};
