import { useRecoilValue } from "recoil";
import { quizListState } from "../atoms";
import { CharacterId } from "../type";

export const useQuiz = (characterId: CharacterId) => {
    const quizList = useRecoilValue(quizListState(characterId))
    return quizList
}