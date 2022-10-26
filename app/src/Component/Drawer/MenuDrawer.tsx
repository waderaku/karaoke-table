import { AccountCircle } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Box,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { selectedCategoryState } from "../../Domain/atoms";

export const MenuDrawer = (props: {
  close: () => void;
  modalOpen: () => void;
}) => {
  const userName = localStorage.getItem("userName") || "名無し";

  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const changeCategoryValue = (value: number) => () => {
    setSelectedCategory(value);
  };
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.close}
      onKeyDown={props.close}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item onClick={props.modalOpen}>
          <IconButton
            id="change-user-name"
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={props.modalOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Grid>
        <Grid item onClick={props.modalOpen}>
          <Typography component="div" id="userName">
            {userName}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={changeCategoryValue(1)}>
            <ListItemIcon>
              <Icon fontSize="large">
                <img
                  width="100%"
                  height="100%"
                  src="svg/ラブライブアイコン.svg"
                />
              </Icon>
            </ListItemIcon>
            <ListItemText primary={"ラブライブ！"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={changeCategoryValue(5)}>
            <ListItemIcon>
              <Icon fontSize="large">
                <img width="100%" height="100%" src="svg/けいおん.svg" />
              </Icon>
            </ListItemIcon>
            <ListItemText primary={"けいおん！"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={changeCategoryValue(6)}>
            <ListItemIcon>
              <Icon fontSize="large">
                <img width="100%" height="100%" src="svg/物語シリーズ.svg" />
              </Icon>
            </ListItemIcon>
            <ListItemText primary={"物語シリーズ"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={changeCategoryValue(7)}>
            <ListItemIcon>
              <Icon fontSize="large">
                <img width="100%" height="100%" src="svg/河合律.svg" />
              </Icon>
            </ListItemIcon>
            <ListItemText primary={"推し曲"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"ALL"} disablePadding>
          <ListItemButton onClick={changeCategoryValue(0)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"ALL"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"サマリー"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"サマリー"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
