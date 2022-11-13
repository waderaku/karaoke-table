import {
  Card,
  CardContent,
  createTheme,
  Grid,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSummaryData } from "../../Domain/hooks/useSummaryData";
import { SummaryChart } from "./SummaryChart/SummaryChart";
import { SummaryTable } from "./SummaryTable/SummaryTable";

const theme = createTheme({
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 4,
          "&:last-child": {
            paddingBottom: 8,
          },
        },
      },
    },
  },
});
export const Summary = () => {
  const { summaryData, mainSummaryData } = useSummaryData();
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
      <Grid container justifyContent="center" mt={3}>
        <Grid item xs={10}>
          <ThemeProvider theme={theme}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  p: 0,
                  "& .MuiCardContent-root:last-child": {
                    pb: 0,
                  },
                }}
              >
                <Grid container justifyContent="center">
                  {Object.keys(mainSummaryData).map((responsible: string) => (
                    <Grid item xs={4}>
                      <Typography
                        sx={{ fontSize: 35 }}
                        color="#ef5350"
                        gutterBottom
                        variant="overline"
                      >
                        {mainSummaryData[responsible]}
                      </Typography>
                      曲
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.primary"
                        gutterBottom
                      >
                        {responsible}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
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
