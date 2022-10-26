import { useRecoilValue } from "recoil";
import { quizScoreState, targetCharacterState } from "../atoms";

export const useSelectedCharacter = (): [string, boolean, boolean] => {
    const targetCharacterId = useRecoilValue(targetCharacterState);
    const quizScore = useRecoilValue(quizScoreState);
    return [targetCharacterId, (targetCharacterId !== ""), (quizScore.score !== -1)];
}