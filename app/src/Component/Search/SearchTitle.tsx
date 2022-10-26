import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { filterContainsTitleState } from "../../Domain/atoms";
export const SearchTitle = () => {
  const [filterContainsTitle, setFilterContainsTitle] = useRecoilState(
    filterContainsTitleState
  );
  const changeSearchedHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterContainsTitle(event.target.value);
  };

  return (
    <Grid container alignItems="flex-end">
      <Grid item xs={4}>
        <SearchIcon />
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="standard-basic"
          label="タイトル"
          variant="standard"
          value={filterContainsTitle}
          onChange={(event) => changeSearchedHandler(event)}
        />
      </Grid>
    </Grid>
  );
};
