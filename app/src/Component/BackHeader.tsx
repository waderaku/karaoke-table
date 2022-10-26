import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { backHeaderPropState } from "../Domain/atoms";
const style = {
  position: "absolute",
  width: "100%",
  top: 0,
  textAlign: "center",
  zIndex: 1000,
};
export const BackHeader = () => {
  const [backHeaderProp, setBackHeaderProp] =
    useRecoilState(backHeaderPropState);
  const back = backHeaderProp.backList.slice(-1)[0];
  const text = backHeaderProp.textList.slice(-1)[0];
  const onClickBack = () => {
    back();
    const backList = backHeaderProp.backList.filter((data, index) => {
      return index !== backHeaderProp.backList.length - 1;
    });
    const textList = backHeaderProp.textList.filter((data, index) => {
      return index !== backHeaderProp.textList.length - 1;
    });
    setBackHeaderProp({ backList: backList, textList: textList });
  };
  return (
    <Box sx={{ style }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            marginLeft={0}
          >
            <Grid item xs={0.5}>
              <IconButton color="inherit" onClick={onClickBack}>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10.5}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {text}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
