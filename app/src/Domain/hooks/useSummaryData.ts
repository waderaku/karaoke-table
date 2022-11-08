import { useRecoilValue } from "recoil";
import { tableData } from "../atoms";
const range = (start: number, end: number) =>
  Array.from(Array(end - start + 1).keys()).map(
    (x) => Number(x) + Number(start)
  );

export const useSummaryData = () => {
  const songList = useRecoilValue(tableData);
  const singSongList = songList.filter((tableRaw) => tableRaw.score);
  let maxScore = 0;
  let minScore = 100;
  singSongList.forEach((tableRow) => {
    if (tableRow.score) {
      maxScore = tableRow.score > maxScore ? tableRow.score : maxScore;
      minScore = tableRow.score < minScore ? tableRow.score : minScore;
    }
  });

  // サマリデータの初期化
  // keyに点数、valueに各メンバーがその点数を取得している曲の一覧が格納される
  let summaryData: { [key: number]: string[][] } = {};
  for (let score of range(minScore, maxScore)) {
    summaryData[score] = [[], [], []];
  }
  singSongList.map((tableRaw) => {
    if (tableRaw.score) {
      if (tableRaw.responsible == "稗田") {
        summaryData[tableRaw.score][0].push(tableRaw.title);
      }
      if (tableRaw.responsible == "水原") {
        summaryData[tableRaw.score][1].push(tableRaw.title);
      }
      if (tableRaw.responsible == "泉") {
        summaryData[tableRaw.score][2].push(tableRaw.title);
      }
    }
  });
  return summaryData;
};
