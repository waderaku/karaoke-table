import { useRecoilValue } from "recoil";
import { characterListState, footerValueState } from "../atoms";

export const useItemList = () => {
  const footerValue = useRecoilValue(footerValueState);
  const characterList = useRecoilValue(characterListState);
  const targetList =
    characterList.find((data) => data.category === footerValue)
      ?.characterList || [];

  return targetList;
};
