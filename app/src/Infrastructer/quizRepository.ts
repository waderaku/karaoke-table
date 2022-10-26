import axios, { AxiosResponse } from "axios";
import { CharacterId, Quiz, QuizList } from "../Domain/type";

const baseURL =
  "https://s8rr184y80.execute-api.ap-northeast-1.amazonaws.com/dev/";
// const baseURL = "http://127.0.0.1:9001/";

export const fetchQuiz = async (characterId: CharacterId) => {
  const quizList = await axios
    .get(baseURL + `quiz/${characterId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response: AxiosResponse<Quiz[]>) => {
      return response.data;
    });
  return quizList;
};
export const registerQuiz = async (
  quizList: QuizList,
  quizCategory: string
) => {
  const uploadQuizList = await axios
    .post(`${baseURL}quiz`, {
      quizListId: quizList.quizListId,
      quizList: quizList.value,
      quizCategory: quizCategory,
    })
    .then((res: AxiosResponse) => {
      return res.data;
    });
  return uploadQuizList;
};
