import axios, { AxiosResponse } from "axios";
import { CharacterList } from "../Domain/type";

const baseURL =
  "https://s8rr184y80.execute-api.ap-northeast-1.amazonaws.com/dev/";
// const baseURL = "http://127.0.0.1:9001/";

export const fetchCharacterList = async () => {
  const characterList = await axios
    .get(baseURL + `character`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response: AxiosResponse<CharacterList[]>) => {
      return response.data;
    });
  return characterList;
};
