import axios, { AxiosResponse } from "axios";
import { Song, TableRaw } from "../Domain/type";

const baseURL =
  "https://s8rr184y80.execute-api.ap-northeast-1.amazonaws.com/dev";

export const fetchTableData = async () => {
  const tableData = await axios
    .get(`${baseURL}/karaoke`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: AxiosResponse) => {
      return res.data.body;
    });
  return tableData;
};
export const updateTableData = async (data:TableRaw, field: string, value: any) => {
    let updateData = {...data}
    if(field==="responsible"){
        updateData.responsible=value
    }
    if(field==="score"){
        updateData.score = value
    }
    const statusCode = await axios
    .post(`${baseURL}/karaoke`, updateData)
    .then((res: AxiosResponse) => {
      return res.status;
    });
    return statusCode;
  };
  
export const updateSong = async (data:Song) => {
  const statusCode = await axios
  .post(`${baseURL}/karaoke`, data)
  .then((res: AxiosResponse) => {
    return res.status;
  });
  return statusCode;
};
export const deleteSong =  async (title:string) => {
  const statusCode = await axios
  .delete(`${baseURL}/karaoke/${title}`)
  .then((res: AxiosResponse) => {
    return res.status;
  });
  return statusCode;
};