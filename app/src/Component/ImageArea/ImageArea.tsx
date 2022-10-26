import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { selectedCategoryState } from "../../Domain/atoms";
export const ImageArea = () => {
  const imageList = ["μ's.png", "aqours.png", "nijigasaki.jpg", "liella.png"];
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  return (
    <Grid container>
      {imageList.map((image, index) => {
        return (
          <Grid item xs={6} p={0.3}>
            <Card
              sx={{ maxWidth: 1000 }}
              variant="outlined"
              onClick={() => {
                setSelectedCategory(index + 1);
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="60"
                  image={"images/" + image}
                />
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
