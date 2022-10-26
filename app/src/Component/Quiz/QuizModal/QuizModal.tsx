import { Box, Button, Grid, Typography } from "@mui/material";
const createMessage = (answerList: number[]) => {
    if (answerList.indexOf(-1) !== -1) {
        return "全ての回答が完了していません。終了しても良いですか？"
    }
    else {
        return "終了します。送信ボタンを押下してください。"
    }
}

export const QuizModal = (props: { style: any, answerList: number[], handleClose: () => void, submit: () => void }) => {

    return (
        <Box sx={props.style}>
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
                        {createMessage(props.answerList)}
                    </Typography>
                </Grid>
                <Grid item xs={"auto"} justifyItems="center">
                    <Button onClick={props.handleClose}>
                        キャンセル
                    </Button>
                </Grid>
                <Grid item xs={"auto"} justifyItems="center">
                    <Button onClick={props.submit}>
                        送信
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}