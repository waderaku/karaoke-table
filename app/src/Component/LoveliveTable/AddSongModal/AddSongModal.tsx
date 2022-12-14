import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isLoadingState, tableData } from "../../../Domain/atoms";
import { Song } from "../../../Domain/type";
import {
  deleteSong,
  fetchTableData,
  updateSong,
} from "../../../Infrastructer/tableDataRepository";
import { SongImageHistoryModal } from "./songImageHistoryModal/songImageHistoryModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
};
export const AddSongModal = (props: { song: Song; closeModal: () => void }) => {
  const [song, setSong] = useState(props.song);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, title: event.target.value });
  };
  const handleChangArtist = (event: ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, artist: event.target.value });
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSong({ ...song, category: event.target.value });
  };
  const handleChangeResponsible = (event: SelectChangeEvent) => {
    setSong({ ...song, responsible: event.target.value });
  };

  const handleChangeScore = (event: ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, score: event.target.value });
  };

  const setIsLoading = useSetRecoilState(isLoadingState);
  const setTableData = useSetRecoilState(tableData);
  const handleUpdate = async () => {
    setIsLoading(true);
    if (props.song.title && props.song.title !== song.title) {
      deleteSong(props.song.title);
    }
    await updateSong(song).then(() => {
      return fetchTableData().then((data) => {
        setIsLoading(false);
        setTableData(data);
        props.closeModal();
      });
    });
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Box m={1} sx={style}>
      <Card variant="outlined">
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <TextField
                  fullWidth
                  id="song-title"
                  label="??????"
                  onChange={handleChangeTitle}
                  value={song.title}
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <TextField
                  fullWidth
                  id="artist"
                  label="??????????????????"
                  onChange={handleChangArtist}
                  value={song.artist}
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <InputLabel id="category-id">???????????????</InputLabel>
                <Select
                  labelId="category-id"
                  id="category"
                  value={song.category}
                  label="???????????????"
                  variant="standard"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={"1"}>??'s</MenuItem>
                  <MenuItem value={"2"}>Aqours</MenuItem>
                  <MenuItem value={"3"}>?????????</MenuItem>
                  <MenuItem value={"4"}>Liella!</MenuItem>
                  <MenuItem value={"5"}>???????????????</MenuItem>
                  <MenuItem value={"6"}>??????????????????</MenuItem>
                  <MenuItem value={"7"}>?????????</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <InputLabel id="responsible-id">?????????</InputLabel>
                <Select
                  labelId="responsible-id"
                  id="responsible"
                  value={song.responsible}
                  label="?????????"
                  variant="standard"
                  onChange={handleChangeResponsible}
                >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"??????"}>??????</MenuItem>
                  <MenuItem value={"???"}>???</MenuItem>
                  <MenuItem value={"??????"}>??????</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <FormControl fullWidth>
                  <TextField
                    value={song.score}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={handleChangeScore}
                    label={"??????"}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Button
                size="small"
                onClick={() => {
                  setIsOpenModal(true);
                }}
              >
                ????????????
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <Modal
          open={isOpenModal}
          onClose={() => {
            setIsOpenModal(false);
          }}
        >
          <SongImageHistoryModal
            scoreImageHistory={props.song.scoreImageHistory}
            title={props.song.title}
            closeModal={() => {
              setIsOpenModal(false);
            }}
          />
        </Modal>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button size="small" onClick={props.closeModal}>
              close
            </Button>
            <Button
              size="small"
              onClick={() => {
                handleUpdate();
              }}
            >
              push
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};
