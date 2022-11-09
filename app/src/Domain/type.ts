export type CharacterId = string;
export enum FooterValue {
  ANIMATION = "Anime",
  CHARACTER = "Character",
  ACTOR = "Actor",
}
export enum DrawerValue {
  CREATE_QUESTION = "CREATE_QUESTION",
  TEST = "TEST",
}
export type QuizScore = {
  score: number;
  fullScore: number;
};
export type Quiz = {
  quizId: string;
  quiz: string;
  choiceList: string[];
  answerIndex: number;
};
export type QuizList = {
  quizListId: string;
  quizListName: string;
  value: Quiz[];
};
export type Score = {
  characterId: CharacterId;
  scoreDate: string;
  userName: string;
  score: number;
};

export type BackHeaderProp = {
  backList: (() => void)[];
  textList: string[];
};

export type CharacterList = {
  category: string;
  characterList: string[];
};

//////////////////ここから実装/////////////////////////

export type User = "稗田" | "泉" | "水原";

export type ScoreImage = {
  imageUrl: string;
  uploadUser: User;
  comment: string;
};
export type TableRaw = {
  score: number | null;
  responsible: string | null;
  title: string;
  artist: string;
  category: number;
  scoreImageHistory: ScoreImage[];
};
export type Song = {
  score: string;
  responsible: string;
  title: string;
  artist: string;
  category: string;
  scoreImageHistory: ScoreImage[];
};

export type UploadScoreImage = {
  title: string;
  imageBase64: string;
  uploadUser: string;
  comment: string;
};
