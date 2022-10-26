import { Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import { FilterResponsible } from "../../Component/Search/FilterResponsible";
import { FilterScore } from "../../Component/Search/FilterScore";
import { filterMaxScore, filterMinScore } from "../../Domain/atoms";
import { SearchTitle } from "./SearchTitle";

export const SearchArea = () => {
  const [filterMinScoreValue, setFilterMinScore] =
    useRecoilState(filterMinScore);
  const [filterMaxScoreValue, setFilterMaxScore] =
    useRecoilState(filterMaxScore);
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <FilterResponsible />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center">
        <Grid item xs={2}>
          <FilterScore
            filterScoreValue={filterMinScoreValue}
            setFilterScore={setFilterMinScore}
            label="最小スコア"
          />
        </Grid>
        <Grid item xs={1}>
          ～
        </Grid>
        <Grid item xs={2}>
          <FilterScore
            filterScoreValue={filterMaxScoreValue}
            setFilterScore={setFilterMaxScore}
            label="最大スコア"
          />
        </Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <SearchTitle />
        </Grid>
      </Grid>
    </>
  );
};
