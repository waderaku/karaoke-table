import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchQuiz } from "../../Infrastructer/quizRepository";
import { isLoadingState, quizListState, targetCharacterState } from "../atoms";
import { CharacterId, Quiz } from "../type";

export const useSelectTarget = (
  targetCharacterId: CharacterId
): (() => void) => {
  const [targetCharacter, setTargetCharacter] =
    useRecoilState(targetCharacterState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setQuizList = useSetRecoilState(quizListState(targetCharacterId));
  const selectTargetCharacter = async () => {
    setIsLoading(true);
    fetchQuiz(targetCharacterId).then((quizList: Quiz[]) => {
      setQuizList(quizList);
      setTargetCharacter(targetCharacterId);
      setIsLoading(false);
    });
  };
  return selectTargetCharacter;
};
