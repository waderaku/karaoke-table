import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isLoadingState, tableData } from "../../../../Domain/atoms";
import { ScoreImage, UploadScoreImage } from "../../../../Domain/type";
import { registerScoreImage } from "../../../../Infrastructer/scoreRepository";
import { fetchTableData } from "../../../../Infrastructer/tableDataRepository";
const getBase64 = (file: Blob) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      baseURL = result.replace(/data:.*\/.*;base64,/, "");
      resolve(baseURL);
    };
  });
};
const iconStyle = {
  fontSize: "200%",
  marginRight: "10px",
  textAlign: "right",
  zIndex: 1000,
};
const style = {
  position: "absolute",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
};

export const SongImageHistoryModal = (props: {
  title: string;
  scoreImageHistory: ScoreImage[];
  closeModal: () => void;
}) => {
  const inputRef = useRef<any>(null);

  const setIsLoading = useSetRecoilState(isLoadingState);
  const setTableData = useSetRecoilState(tableData);

  const [uploadSongImage, setUploadSongImage] = useState<UploadScoreImage>({
    title: props.title,
    imageBase64: "",
    uploadUser: localStorage.getItem("userName") || "名無し",
    comment: "",
  });

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      getBase64(file)
        .then((result) => {
          setUploadSongImage({
            ...uploadSongImage,
            imageBase64: result as string,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fileChange = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const fileUpload = async () => {
    setIsLoading(true);
    await registerScoreImage(uploadSongImage).then(() => {
      return fetchTableData().then((data) => {
        setIsLoading(false);
        setTableData(data);
      });
    });
  };

  const updateComment = (e: { target: { value: string } }) => {
    setUploadSongImage({ ...uploadSongImage, comment: e.target.value });
  };

  return (
    <Box sx={style}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <CancelIcon
            sx={iconStyle}
            color="action"
            onClick={props.closeModal}
          />
        </Grid>
      </Grid>
      <Divider />
      {(() => {
        if (props.scoreImageHistory.length === 0) {
          return <Typography>no photo image</Typography>;
        }
      })()}
      <ImageList cols={3}>
        {props.scoreImageHistory?.map((scoreImage: ScoreImage) => (
          <ImageListItem key={scoreImage.imageUrl}>
            <img src={`${scoreImage.imageUrl}`} loading="lazy" height="100" />
            <ImageListItemBar
              title={scoreImage.uploadUser}
              subtitle={<span>{scoreImage.comment}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Grid container>
          <Grid item xs={1.5}>
            <IconButton sx={{ p: "5px", pl: "8px" }} aria-label="menu">
              <PhotoCameraIcon onClick={fileChange} />
            </IconButton>
          </Grid>

          <Grid item xs={8.5}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="コメントを入力"
              value={uploadSongImage.comment}
              onChange={updateComment}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={fileUpload}>
              送信
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileInputChange}
      />
    </Box>
  );
};
