import { Box, Button, Grid, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { isLoadingState, quizScoreState } from "../../Domain/atoms";
import { QuizScore, Score } from "../../Domain/type";
import { fetchScore } from "../../Infrastructer/scoreRepository";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    backgroundColor: 'info.main',
    borderRadius: '30px'
};

export const CompleteQuiz = (props: { characterId: string }) => {
    const [userScoreList, setUserScoreList] = useState<Score[]>([])
    const score = useRecoilValue(quizScoreState)
    const messageScore = `${score.score}/${score.fullScore}`
    const createMessage = (score: QuizScore) => {
        const rate = score.score / score.fullScore
        if (rate <= 0.2) {
            return "もっと頑張りましょう"
        }
        else if (rate <= 0.5) {
            return "もう少し頑張りましょう"
        }
        else if (rate <= 0.8) {
            return "悪くないです。この調子で頑張りましょう"
        }
        else {
            return "あなたはこのキャラクターの専門家ですね！"
        }
    }
    const resetScoreState = useResetRecoilState(quizScoreState)
    const retry = () => {
        resetScoreState()
    }
    const setIsLoading = useSetRecoilState(isLoadingState)
    const getScore = () => {
        setIsLoading(true)
        fetchScore(props.characterId).then(
            (scoreList: Score[]) => {
                setUserScoreList(scoreList)
                setIsLoading(false)
            }
        )
    }

    const createTable = () => {
        if (userScoreList.length === 0) {
            return null;
        }
        const createDateData = (date: string) => {
            const ts = Date.parse(date);
            const dt = new Date(ts)
            return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDay() + 1}日`
        }
        return (
            <TableContainer component={Paper} sx={{ paddingBottom: 8 }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell align="right">ユーザー名</StyledTableCell>
                            <StyledTableCell align="right">テスト日付</StyledTableCell>
                            <StyledTableCell align="right">点数</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userScoreList.map((score: Score, index: number) => (
                            <StyledTableRow key={score.characterId}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="right">{score.userName}</StyledTableCell>
                                <StyledTableCell align="right">{createDateData(score.scoreDate)}</StyledTableCell>
                                <StyledTableCell align="right">{score.score}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >)
    }

    return (
        <div>
            <Box
                sx={style}
                marginTop={8}
                marginX={3}
                paddingBottom={1}>
                <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                    rowSpacing={2}
                    padding={0}
                >
                    <Grid item>
                        <Typography variant="h6" color={"white"}>お疲れさまでした！アニメクイズを終了しました。</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color={"white"}>あなたのスコアは{messageScore}です！</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color={"white"}>{createMessage(score)}</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                rowSpacing={3}
                padding={2}
            >
                <Grid item xs={"auto"} justifyItems="center">
                    <Button variant="contained" color="success" onClick={retry}>
                        もう一度クイズを解く
                    </Button>
                </Grid>
                <Grid item xs={"auto"} justifyItems="center">
                    <Button variant="contained" color="success" onClick={getScore} >
                        他のユーザの結果を見る
                    </Button>
                </Grid>
            </Grid>
            {createTable()}
        </div >
    )
}