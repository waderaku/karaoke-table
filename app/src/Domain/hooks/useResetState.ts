import { useResetRecoilState } from "recoil";
import {
  backHeaderPropState,
  drawerValueState,
  headerViewFlgState,
  quizScoreState,
  targetCharacterState,
} from "../atoms";

export const useResetState = () => {
  const resetCharacterState = useResetRecoilState(targetCharacterState);
  const resetScoreState = useResetRecoilState(quizScoreState);
  const resetDrawerViewState = useResetRecoilState(drawerValueState);
  const resetHeaderViewState = useResetRecoilState(headerViewFlgState);
  const resetHeaderPropState = useResetRecoilState(backHeaderPropState);
  const resetState = () => {
    resetCharacterState();
    resetScoreState();
    resetDrawerViewState();
    resetHeaderViewState();
    resetHeaderPropState();
  };
  return resetState;
};
