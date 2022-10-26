import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { backHeaderPropState } from "../../Domain/atoms";
import { Quiz, QuizList } from "../../Domain/type";
import { CreateQuizMain } from "./CreateQuiz/CreateQuizMain";
import { CreateQuizListModal } from "./CreateQuizListModal/CreateQuizListModal";
const style = {
  fontSize: "350%",
  position: "absolute",
  right: "8%",
  bottom: "15%",
};

export const CreateQuizList = () => {
  const createQuizList: QuizList[] = JSON.parse(
    localStorage.getItem("createQuizList") || "[]"
  );

  // 新規クイズリスト作成モーダル
  const [quizListModalState, setQuizModalListState] = useState(false);
  const closeModal = () => setQuizModalListState(false);
  const openModal = () => setQuizModalListState(true);

  const [name, setName] = useState("");
  const handleChange = (event: any) => {
    setName(event.target.value);
  };
  const cancel = () => {
    closeModal();
    setName("");
  };
  const addQuizList = () => {
    closeModal();
    setName("");
    const newList = [
      ...createQuizList,
      { quizListId: "", quizListName: name, value: [] },
    ];
    localStorage.setItem("createQuizList", JSON.stringify(newList));
  };

  const setQuizList = (targetIndex: number) => (newQuizList: Quiz[]) => {
    const newList = createQuizList.map((quizList: QuizList, index: number) => {
      return targetIndex === index
        ? {
            quizListId: quizList.quizListId,
            quizListName: quizList.quizListName,
            value: newQuizList,
          }
        : quizList;
    });
    localStorage.setItem("createQuizList", JSON.stringify(newList));
  };

  const setQuizListId = (targetIndex: number) => (newQuizListId: string) => {
    const newList = createQuizList.map((quizList: QuizList, index: number) => {
      return targetIndex === index
        ? {
            quizListId: newQuizListId,
            quizListName: quizList.quizListName,
            value: quizList.value,
          }
        : quizList;
    });
    localStorage.setItem("createQuizList", JSON.stringify(newList));
  };

  // クイズリスト画面への遷移を管理
  const [selectedQuizList, setSelectedQuizList] = useState(-1);
  const selectQuizList = (index: number) => () => {
    setSelectedQuizList(index);
  };
  const [backHeaderProp, setBackHeaderProp] =
    useRecoilState(backHeaderPropState);

  if (selectedQuizList !== -1) {
    const back = () => {
      setSelectedQuizList(-1);
    };

    if (backHeaderProp.textList.length === 1) {
      setBackHeaderProp({
        backList: [...backHeaderProp.backList, back],
        textList: [
          ...backHeaderProp.textList,
          createQuizList[selectedQuizList].quizListName,
        ],
      });
    }

    return (
      <>
        <CreateQuizMain
          quizList={createQuizList[selectedQuizList]}
          updateQuizList={setQuizList(selectedQuizList)}
          updateQuizListId={setQuizListId(selectedQuizList)}
        />
      </>
    );
  }
  return (
    <Box sx={{ width: "100%", marginTop: 2 }}>
      <List>
        {createQuizList.map((data: QuizList, index: number) => {
          return (
            <>
              <ListItem disablePadding>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  marginRight={0}
                >
                  <ListItemButton onClick={selectQuizList(index)}>
                    <Grid item xs={9.5}>
                      <ListItemText primary={data.quizListName} />
                    </Grid>
                    <Grid item xs={1.5}>
                      <ListItemText primary={data.value.length + "問"} />
                    </Grid>
                    <Grid item xs={1}>
                      <ChevronRightIcon></ChevronRightIcon>
                    </Grid>
                  </ListItemButton>
                </Grid>
              </ListItem>
              <Divider light />
            </>
          );
        })}
      </List>
      <AddCircleIcon onClick={openModal} color="success" sx={style} />

      <Modal open={quizListModalState} onClose={closeModal}>
        <CreateQuizListModal
          name={name}
          handleChange={handleChange}
          cancel={cancel}
          save={addQuizList}
        ></CreateQuizListModal>
      </Modal>
    </Box>
  );
};
