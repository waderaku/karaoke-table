import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Quiz } from "../../../Domain/type";

const textFieldStyle = (color: string) => {
  return {
    "& label": {
      color: color, // 通常時のラベル色
    },
    "& .Mui-focused": {
      color: color, // 通常時のラベル色
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: color, // 通常時のボーダー色
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: color, // ホバー時のボーダー色
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: color, // 通常時のボーダー色(アウトライン)
      },
      "&:hover fieldset": {
        borderColor: color, // ホバー時のボーダー色(アウトライン)
      },
    },
  };
};

export const CreateQuiz = (props: {
  quiz: Quiz;
  delete: () => void;
  save: (quiz: Quiz) => void;
}) => {
  // クイズの中身
  const [quizText, setQuizText] = useState(props.quiz.quiz);
  const [choiceList, setChoiceList] = useState(props.quiz.choiceList);
  const [answerIndex, setAnswerIndex] = useState(props.quiz.answerIndex);

  const changeQuizText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizText(event.target.value);
  };
  const changeChoice =
    (targetIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChoiceList = choiceList.map((data: string, index: number) => {
        return index === targetIndex ? event.target.value : data;
      });
      setChoiceList(newChoiceList);
    };

  const handleChange = (event: SelectChangeEvent) => {
    setAnswerIndex(Number(event.target.value));
  };

  // 入力チェックの管理
  const [errorStatus, setErrorStatus] = useState({
    quiz: false,
    choiceList: false,
    answerIndex: false,
  });

  const saveQuiz = () => {
    let errorFlg = false;
    // 入力チェック
    if (!quizText) {
      errorStatus.quiz = true;
      errorFlg = true;
    } else {
      errorStatus.quiz = false;
    }

    const blankList = choiceList.filter((data: string) => {
      return data === "";
    });
    if (blankList.length !== 0) {
      errorStatus.choiceList = true;
      errorFlg = true;
    } else {
      errorStatus.choiceList = false;
    }

    if (answerIndex === -1) {
      errorStatus.answerIndex = true;
      errorFlg = true;
    } else {
      errorStatus.answerIndex = false;
    }
    if (errorFlg) {
      setErrorStatus({ ...errorStatus });
    } else {
      props.save({
        quizId: props.quiz.quizId,
        quiz: quizText,
        choiceList: choiceList,
        answerIndex: Number(answerIndex),
      });
    }
  };

  const createErrorMessage = (errorFlg: boolean, message: string) => {
    if (!errorFlg) {
      return null;
    }
    return (
      <Grid
        container
        rowSpacing={2}
        marginTop={-2}
        marginBottom={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid xs={1}></Grid>
        <Grid>
          <Alert severity="error" sx={{ fontsize: "8px", padding: "2px" }}>
            {message}
          </Alert>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        rowSpacing={2}
        marginTop={0}
        marginBottom={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10}>
          <TextField
            id="standard-multiline-static"
            label="問題"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={quizText}
            onChange={changeQuizText}
          />
        </Grid>
      </Grid>
      {createErrorMessage(errorStatus.quiz, "問題文を入力してください")}
      <Grid
        container
        rowSpacing={1}
        marginTop={0}
        marginBottom={2}
        justifyContent="center"
        alignItems="center"
      >
        {choiceList.map((data: string, index: number) => {
          return (
            <Grid item xs={10}>
              <TextField
                onChange={changeChoice(index)}
                fullWidth
                multiline
                label={"選択肢" + (index + 1)}
                variant="outlined"
                value={data}
                sx={answerIndex == index ? textFieldStyle("#dd5522") : {}}
              />
            </Grid>
          );
        })}
      </Grid>
      {createErrorMessage(
        errorStatus.choiceList,
        "選択肢をすべて入力してください"
      )}
      <Grid
        container
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems="center"
        marginBottom={3}
      >
        <Grid item>
          <FormControl size="small">
            <InputLabel id="answer-select-label">解答</InputLabel>
            <Select
              labelId="answer-select-label"
              id="answer-select"
              label={"解答"}
              value={answerIndex.toString()}
              onChange={handleChange}
            >
              <MenuItem value={"-1"}>選択してください</MenuItem>
              <MenuItem value={"0"}>選択肢1</MenuItem>
              <MenuItem value={"1"}>選択肢2</MenuItem>
              <MenuItem value={"2"}>選択肢3</MenuItem>
              <MenuItem value={"3"}>選択肢4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      {createErrorMessage(
        errorStatus.answerIndex,
        "解答選択肢を設定してください"
      )}
      <Grid
        container
        direction={"row"}
        justifyContent="space-evenly"
        alignItems="center"
        marginBottom={8}
      >
        <Grid item xs={"auto"} justifyItems="center">
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={props.delete}
          >
            削除
          </Button>
        </Grid>
        <Grid item xs={"auto"} justifyItems="center">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={saveQuiz}
          >
            保存
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
