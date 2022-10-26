import { Card, CardActionArea, CardMedia, Container } from "@mui/material";
import { useSelectTarget } from "../../Domain/hooks/useSelectTarget";

export const CardButton = (props: { characterId: string }) => {
    const selectTarget = useSelectTarget(props.characterId);
    return (
        <Container>
            <Card sx={{ maxWidth: 1000 }} variant="outlined" onClick={selectTarget}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={"images/" + props.characterId + ".jpg"}
                        alt={props.characterId}
                    />
                </CardActionArea>
            </Card>
        </Container >
    )
}