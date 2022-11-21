import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  SwipeableDrawer,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MenuDrawer } from "./Drawer/MenuDrawer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  paddingBottom: "8px",
  paddingRight: "10px",
  paddingLeft: "25px",
};
export const Header = () => {
  // ハンバーガーメニュー関係
  const [drawerState, setDrawerState] = useState(false);
  const closeDrawer = () => setDrawerState(false);
  const openDrawer = () => setDrawerState(true);

  // ユーザ名関係
  let userName = "名無し";
  if (process.browser && localStorage.getItem("userName")) {
    userName = localStorage.getItem("userName") || "名無し";
  }
  const [name, setName] = useState(userName);
  const handleChange = (event: any) => {
    setName(event.target.value);
  };
  const [nameSpaceopen, setNameSpaceOpen] = useState(false);
  const handleOpen = () => setNameSpaceOpen(true);
  const handleClose = () => setNameSpaceOpen(false);
  const cancel = () => {
    handleClose();
    setName(userName);
  };
  const save = () => {
    handleClose();
    localStorage.setItem("userName", name);
  };

  //   const style = {
  //     position: "absolute",
  //     width: "100%",
  //     top: 0,
  //     textAlign: "center",
  //     zIndex: 0,
  //   };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Box sx={{ style }}> */}
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            marginLeft={0}
          >
            <Grid item xs={0.5}>
              <IconButton color="inherit" onClick={openDrawer}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10.5}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                カラオケスコア
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Modal
        open={nameSpaceopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            rowSpacing={2}
            marginTop={-5}
            padding={0}
          >
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                ユーザー名を入力してください
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            rowSpacing={2}
            padding={0}
          >
            <Grid item>
              <TextField
                id="user-name-field"
                label="Name"
                value={name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            rowSpacing={2}
            padding={0}
          >
            <Grid item xs={"auto"} justifyItems="center">
              <Button onClick={cancel} id="cancelButton">
                キャンセル
              </Button>
            </Grid>
            <Grid item xs={"auto"} justifyItems="center">
              <Button onClick={save} id="saveNameButton">
                保存
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <SwipeableDrawer
        anchor={"left"}
        open={drawerState}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <MenuDrawer close={closeDrawer} modalOpen={handleOpen}></MenuDrawer>
      </SwipeableDrawer>
    </Box>
  );
};
