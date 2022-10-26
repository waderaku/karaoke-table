import axios, { AxiosResponse } from "axios";
import { CharacterId, Score, UploadScoreImage } from "../Domain/type";

const baseURL =
  "https://s8rr184y80.execute-api.ap-northeast-1.amazonaws.com/dev";

export const registerScore = async (
  score: number,
  characterId: CharacterId
) => {
  const userName = localStorage.getItem("userName") || "名無し";
  const statusCode = await axios
    .post(`${baseURL}/user/score`, {
      characterId: characterId,
      score: score,
      userName: userName,
    })
    .then((res: AxiosResponse) => {
      return res.status;
    });
  return statusCode;
};

export const fetchScore = async (characterId: CharacterId) => {
  const scoreList = await axios
    .get(`${baseURL}/user/score/${characterId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: AxiosResponse<Score[]>) => {
      return res.data;
    });
  return scoreList;
};

export const registerScoreImage = async (uploadScoreImage: UploadScoreImage) => {
  const scoreList = await axios
  .post(`${baseURL}/score/image`, uploadScoreImage,{
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res: AxiosResponse<Score[]>) => {
    return res.data;
  });
return scoreList;
}