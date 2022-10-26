import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { filterResponsible } from "../../Domain/atoms";

export const FilterResponsible = () => {
  const [filterResponsibleValue, setFilterResponsible] =
    useRecoilState(filterResponsible);
  const handleChange = (event: SelectChangeEvent) => {
    if (!event.target.value) {
      setFilterResponsible("");
    }
    setFilterResponsible(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">担当者</InputLabel>
      <Select
        value={filterResponsibleValue}
        onChange={handleChange}
        sx={{ background: "#eeeeee" }}
      >
        <MenuItem value={""}></MenuItem>
        <MenuItem value={"稗田"}>稗田</MenuItem>
        <MenuItem value={"泉"}>泉</MenuItem>
        <MenuItem value={"水原"}>水原</MenuItem>
        <MenuItem value={"未担当"}>未担当</MenuItem>
      </Select>
    </FormControl>
  );
};
