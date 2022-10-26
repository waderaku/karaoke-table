import { FormControl, TextField } from "@mui/material";

export const FilterScore = (props: {
  filterScoreValue: number | null;
  setFilterScore: (score: number | null) => void;
  label: string;
}) => {
  const handleChange = (event: { target: { value: string } }) => {
    if (!event.target.value) {
      props.setFilterScore(null);
    }
    props.setFilterScore(parseInt(event.target.value));
  };

  return (
    <FormControl fullWidth>
      {/* <InputLabel id="demo-simple-select-label">担当者</InputLabel> */}
      <TextField
        value={props.filterScoreValue ? props.filterScoreValue : ""}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onChange={handleChange}
        label={props.label}
      />
    </FormControl>
  );
};
