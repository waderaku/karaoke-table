import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, FormControl, Grid, IconButton, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from 'recoil';
import { isLoadingState, quizScoreState } from '../../Domain/atoms';
import { useQuiz } from "../../Domain/hooks/useQuiz";
import { registerScore } from '../../Infrastructer/scoreRepository';
import { QuizCard } from "./QuizCard/QuizCard";
import { QuizModal } from './QuizModal/QuizModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    paddingBottom: '8px',
    paddingRight: '10px',
    paddingLeft: '25px'
};

export const Quiz = (props: { characterId: string }) => {
    const quizList = useQuiz(props.characterId);
    const [answerList, setAnswerList] = useState(Array(quizList.length).fill(-1))
    const [quizIndex, setQuizIndex] = useState(0);
    const nextQuiz = () => { setQuizIndex(quizIndex + 1) }
    const beforeQuiz = () => { setQuizIndex(quizIndex - 1) }
    const targetQuiz = quizList[quizIndex]
    const onClick = (id: number) => () => {
        answerList[quizIndex] = id
        setAnswerList([...answerList])
    };
    const selectedValue = answerList[quizIndex];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const setIsLoading = useSetRecoilState(isLoadingState)
    const setQuizScore = useSetRecoilState(quizScoreState);
    const calcScore = () => {
        let score = 0
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i] === quizList[i].answerIndex) {
                score++;
            }
        }
        return score
    }
    const submit = () => {
        const score = calcScore()
        setIsLoading(true)
        registerScore(score, props.characterId).then(
            (status: number) => {
                const quizScore = {
                    score: score,
                    fullScore: quizList.length
                }
                setQuizScore(quizScore)
                setIsLoading(false)
            }
        )
        handleClose()
    }

    const beforeComponent = () => {
        if (quizIndex !== 0) {
            return (
                <IconButton color="primary" aria-label="allow back icon" component="span" onClick={beforeQuiz}>
                    <ArrowBackIcon fontSize='large' />
                </IconButton>
            )
        }
    }
    const nextComponent = () => {
        if (quizIndex !== quizList.length - 1) {
            return (
                <IconButton color="primary" aria-label="arrow forward icon" component="span" onClick={nextQuiz}>
                    <ArrowForwardIcon fontSize='large' />
                </IconButton>
            )
        }
    }

    return (
        <FormControl>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                rowSpacing={3}
                marginTop={0}
            >
                <Grid item xs={12}>
                    <Typography id="demo-radio-buttons-group-label">{targetQuiz.quiz}</Typography>
                </Grid>
                {
                    targetQuiz.choiceList.map(
                        (value: string, index: number) => {
                            return (
                                <Grid item >
                                    <QuizCard
                                        text={value}
                                        checked={selectedValue === index}
                                        onClick={onClick(index)}
                                    />
                                </Grid>
                            )
                        }
                    )
                }
            </Grid>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                rowSpacing={3}
                marginTop={0}
                marginBottom={8}
            >
                <Grid item xs={4}>
                    {beforeComponent()}
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        完了
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    {nextComponent()}
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <QuizModal style={style} answerList={answerList} handleClose={handleClose} submit={submit}></QuizModal>
            </Modal>
        </FormControl >
    )
}