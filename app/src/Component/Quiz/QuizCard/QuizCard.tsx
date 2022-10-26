import { Card, CardActionArea, Grid, Radio, Typography } from "@mui/material";

export const QuizCard = (props: {
  text: string;
  checked: boolean;
  onClick: () => void;
}) => {
  return (
    <Card sx={{ width: 250 }} variant="outlined" onClick={props.onClick}>
      <CardActionArea>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={3}
        >
          <Grid item xs={2}>
            <Radio checked={props.checked} />
          </Grid>
          <Grid item xs={10}>
            <Typography component="p">{props.text}</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
