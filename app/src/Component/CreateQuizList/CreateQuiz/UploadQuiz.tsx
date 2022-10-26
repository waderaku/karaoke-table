import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { isLoadingState } from "../../../Domain/atoms";
import { registerImage } from "../../../Infrastructer/imageRepository";
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
  paddingTop: "8px",
  paddingRight: "10px",
  paddingLeft: "25px",
};
export const UploadQuiz = (props: {
  onClose: () => void;
  uploadQuiz: (quizCategory: string) => Promise<string>;
}) => {
  const [preview, setPreview] = useState("images/no-image.png");
  const [file, setFile] = useState();
  const handleChangeFile = (e: any) => {
    const { files } = e.target;
    setFile(files[0]);
    setPreview(window.URL.createObjectURL(files[0]));
  };

  const setIsLoading = useSetRecoilState(isLoadingState);
  const [category, setCategory] = useState("Anime");
  const imageClick = () => {
    document?.getElementById("imageFile")?.click();
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const upload = async () => {
    setIsLoading(true);
    props.uploadQuiz(category).then((quizId: string) => {
      registerImage(file, quizId).then((data) => {
        setIsLoading(false);
        props.onClose();
      });
    });
  };

  return (
    <Box sx={style}>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <img
          src={preview}
          alt="preview"
          width="60%"
          height="40%"
          onClick={imageClick}
        />
        <input id="imageFile" type="file" hidden onChange={handleChangeFile} />
        <FormControl size="small">
          <InputLabel id="category-select-label">カテゴリ</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label={"カテゴリ"}
            value={category}
            onChange={handleChangeCategory}
          >
            <MenuItem value={"Anime"}>Anime</MenuItem>
            <MenuItem value={"Character"}>Character</MenuItem>
            <MenuItem value={"Actor"}>Actor</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        rowSpacing={2}
      >
        <Grid item xs={"auto"} justifyItems="center">
          <Button onClick={props.onClose} id="cancelButton">
            キャンセル
          </Button>
        </Grid>
        <Grid item xs={"auto"} justifyItems="center">
          <Button onClick={upload} id="saveNameButton">
            OK
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
