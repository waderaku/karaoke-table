import axios, { AxiosResponse } from "axios";
const baseURL =
  "https://s8rr184y80.execute-api.ap-northeast-1.amazonaws.com/dev";
export const fetchVersion = async () => {
  const versionNumber = await axios
    .get(`${baseURL}/version`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: AxiosResponse<number>) => {
      return res.data;
    });
  return versionNumber;
};
