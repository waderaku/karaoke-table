import { Box, Grid } from "@mui/material";
import { useItemList } from "../Domain/hooks/useItemList";
import { CardButton } from "./CardButton/CardButton";
export const Menu = () => {
  const itemList = useItemList();
  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        paddingBottom={8}
      >
        {itemList.map((data: string) => {
          return (
            <Grid item xs={12}>
              <CardButton characterId={data}></CardButton>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
