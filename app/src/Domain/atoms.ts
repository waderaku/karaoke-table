import { atom, atomFamily, selector } from "recoil";
import {
  BackHeaderProp,
  CharacterId,
  CharacterList,
  DrawerValue,
  FooterValue,
  Quiz,
  QuizScore,
  ScoreImage,
  Song,
  TableRaw,
} from "./type";

export const targetCharacterState = atom<CharacterId>({
  key: "targetCharacterState",
  default: "",
});

export const quizScoreState = atom<QuizScore>({
  key: "quizScoreState",
  default: {
    score: -1,
    fullScore: -1,
  },
});

export const footerValueState = atom<FooterValue>({
  key: "footerValueState",
  default: FooterValue.ANIMATION,
});

export const drawerValueState = atom<DrawerValue>({
  key: "quizListState",
  default: DrawerValue.TEST,
});

export const quizListState = atomFamily<Quiz[], CharacterId>({
  key: "quizListState",
  default: [],
});

export const headerViewFlgState = atom<boolean>({
  key: "headerViewFlgState",
  default: true,
});
export const backHeaderPropState = atom<BackHeaderProp>({
  key: "backHeaderPropState",
  default: {
    backList: [],
    textList: [],
  },
});

export const characterListState = atom<CharacterList[]>({
  key: "characterListState",
  default: [
    {
      category: "",
      characterList: [],
    },
  ],
});

//////////////////ここから実装/////////////////////////

export const tableData = atom<TableRaw[]>({
  key: "tableDataState",
  default: [],
});

export const filterResponsible = atom<string>({
  key: "filterResponsibleState",
  default: "",
});

export const filterMinScore = atom<number | null>({
  key: "filterMinScoreState",
  default: null,
});

export const filterMaxScore = atom<number | null>({
  key: "filterMaxScoreState",
  default: null,
});

export const filterContainsTitleState = atom<string | null>({
  key: "filterContainsTitleState",
  default: null,
});

/**
 * 何のカテゴリの曲かを示す
 * 1. μ`s
 * 2. Aqours
 * 3. 虹が先
 * 4. Liella!
 * 5. けいおん！
 * 6. 物語シリーズ
 * 7. 推し曲
 */
export const selectedCategoryState = atom<number>({
  key: "selectedCategoryState",
  default: 1,
});

export const backGroundImageState = selector<string>({
  key: "backgroundImageState",
  get: ({ get }) => {
    return "background" + get(selectedCategoryState) + ".jpg";
  },
});

export const isLoadingState = atom<boolean>({
  key: "isLoadingState",
  default: false,
});

export const selectedSongTitleState = atom<string>({
  key: "selectedSongTitleState",
  default: "",
});

export const selectedSong = selector<Song>({
  key: "selectedSong",
  get: ({ get }) => {
    const selectedSongTitle = get(selectedSongTitleState);
    const tableDataList = get(tableData);
    const targetData = tableDataList.find(
      (tableRaw) => tableRaw.title === selectedSongTitle
    );
    if (!targetData) {
      return {
        title: "",
        artist: "",
        category: "",
        responsible: "",
        score: "",
        scoreImageHistory: [] as ScoreImage[],
      };
    }
    return {
      title: targetData.title,
      artist: targetData.artist,
      category: targetData.category.toString(),
      responsible: targetData.responsible ? targetData.responsible : "",
      score: targetData.score ? targetData.score.toString() : "",
      scoreImageHistory: targetData.scoreImageHistory
        ? targetData.scoreImageHistory
        : [],
    };
  },
});
