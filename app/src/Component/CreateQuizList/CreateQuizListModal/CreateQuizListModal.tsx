import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  paddingBottom: "8px",
  paddingRight: "10px",
  paddingLeft: "25px",
};
export const CreateQuizListModal = (props: {
  name: string;
  handleChange: (event: any) => void;
  cancel: () => void;
  save: () => void;
}) => {
  return (
    <Box sx={style}>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
        marginTop={-5}
        padding={0}
      >
        <Grid item xs={"auto"}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            新しいクイズリスト
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="user-name-field"
            label="クイズリスト名を入力"
            value={props.name}
            onChange={props.handleChange}
            fullWidth
            size={"small"}
          />
        </Grid>
        <Grid item xs={"auto"} justifyItems="center">
          <Button onClick={props.cancel} id="cancelButton">
            キャンセル
          </Button>
        </Grid>
        <Grid item xs={"auto"} justifyItems="center">
          <Button onClick={props.save} id="saveNameButton">
            保存
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
