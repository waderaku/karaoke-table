import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { backHeaderPropState, isLoadingState } from "../../../Domain/atoms";
import { Quiz, QuizList } from "../../../Domain/type";
import { registerQuiz } from "../../../Infrastructer/quizRepository";
import { CreateQuiz } from "./CreateQuiz";
import { UploadQuiz } from "./UploadQuiz";

const style = {
  fontSize: "350%",
  position: "absolute",
  right: "8%",
  bottom: "15%",
};
export const CreateQuizMain = (props: {
  quizList: QuizList;
  updateQuizList: (quizList: Quiz[]) => void;
  updateQuizListId: (quizListId: string) => void;
}) => {
  // 【課題】親コンポーネントの値を子コンポーネント側で仮の値として管理するために新規でuseStateを呼び出している
  const [quizList, setQuizList] = useState(props.quizList.value);
  const [quizListId, setQuizListId] = useState(props.quizList.quizListId);
  const setIsLoading = useSetRecoilState(isLoadingState);

  // UploadQuizModalの管理
  const [uploadQuizModalState, setUploadQuizState] = useState(false);
  const closeModal = () => setUploadQuizState(false);
  const openModal = () => setUploadQuizState(true);

  const [backHeaderProp, setBackHeaderProp] =
    useRecoilState(backHeaderPropState);
  const removeLastBackHeaderProp = () => {
    const backList = backHeaderProp.backList.filter((data, index) => {
      return index !== backHeaderProp.backList.length - 1;
    });
    const textList = backHeaderProp.textList.filter((data, index) => {
      return index !== backHeaderProp.textList.length - 1;
    });
    setBackHeaderProp({ backList: backList, textList: textList });
  };

  // クイズ画面への遷移を管理
  const [selectedQuiz, setSelectedQuiz] = useState(-1);
  const deleteQuiz = () => {
    const newList = quizList.filter((quiz: Quiz, index: number) => {
      return index !== selectedQuiz;
    });
    // 【課題】再レンダリング時のデータの更新の都合で親子コンポーネント両方にセットしている
    setQuizList(newList);
    props.updateQuizList(newList);
    setSelectedQuiz(-1);
    setAddFlg(false);
    removeLastBackHeaderProp();
  };
  const saveQuiz = (newQuiz: Quiz) => {
    const newList = quizList.map((quiz: Quiz, index: number) => {
      return index === selectedQuiz ? newQuiz : quiz;
    });
    setQuizList(newList);
    props.updateQuizList(newList);
    setSelectedQuiz(-1);
    setAddFlg(false);
    removeLastBackHeaderProp();
  };

  // Quiz作成画面へ
  const [addFlg, setAddFlg] = useState(false);

  if (selectedQuiz !== -1) {
    let resetQuizList = () => {};
    if (addFlg) {
      resetQuizList = () => {
        const newList = quizList.filter((data, index) => {
          return index !== quizList.length - 1;
        });
        setQuizList(newList);
      };
    }
    const back = () => {
      setSelectedQuiz(-1);
      setAddFlg(false);
      resetQuizList();
    };

    if (backHeaderProp.textList.length === 2) {
      setBackHeaderProp({
        backList: [...backHeaderProp.backList, back],
        textList: [
          ...backHeaderProp.textList,
          backHeaderProp.textList.slice(-1)[0],
        ],
      });
    }
    return (
      <CreateQuiz
        quiz={quizList[selectedQuiz]}
        delete={deleteQuiz}
        save={saveQuiz}
      />
    );
  }

  const addQuiz = () => {
    const lastQuiz = quizList.length !== 0 ? quizList.slice(-1)[0] : null;
    const newQuizId = lastQuiz ? (Number(lastQuiz.quizId) + 1).toString() : "1";
    const newList = [
      ...quizList,
      {
        quizId: newQuizId,
        quiz: "",
        choiceList: ["", "", "", ""],
        answerIndex: -1,
      },
    ];
    setQuizList(newList);
    setAddFlg(true);
    setSelectedQuiz(newList.length - 1);
  };

  const selectQuiz = (index: number) => () => setSelectedQuiz(index);
  const quizListRender = () => {
    if (quizList.length === 0) {
      return (
        <Box
          sx={{
            position: "absolute",
            bottom: "50%",
            width: "100%",
          }}
        >
          <Typography>クイズが作成されていません。</Typography>
          <Typography>右下の+ボタンを押して作成してください。</Typography>
        </Box>
      );
    } else {
      const uploadQuiz = async (quizCategory: string) => {
        const uploadQuizList = {
          quizListId: quizListId,
          quizListName: props.quizList.quizListName,
          value: quizList,
        };
        return await registerQuiz(uploadQuizList, quizCategory).then(
          (quizList: QuizList) => {
            setQuizListId(quizList.quizListId);
            props.updateQuizListId(quizList.quizListId);
            return quizList.quizListId;
          }
        );
      };
      return (
        <>
          <List>
            {quizList.map((data: Quiz, index: number) => {
              return (
                <>
                  <ListItem disablePadding>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      marginRight={0}
                    >
                      <ListItemButton onClick={selectQuiz(index)}>
                        <Grid item xs={1}>
                          <ListItemText primary={index + 1 + "."} />
                        </Grid>
                        <Grid item xs={11}>
                          <ListItemText primary={data.quiz} />
                        </Grid>
                      </ListItemButton>
                    </Grid>
                  </ListItem>
                  <Divider light />
                </>
              );
            })}
          </List>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={openModal}
            >
              投稿
            </Button>
            <Modal open={uploadQuizModalState} onClose={closeModal}>
              <UploadQuiz onClose={closeModal} uploadQuiz={uploadQuiz} />
            </Modal>
          </Grid>
        </>
      );
    }
  };
  return (
    <>
      {quizListRender()}
      <AddCircleIcon color="success" sx={style} onClick={addQuiz} />
    </>
  );
};
