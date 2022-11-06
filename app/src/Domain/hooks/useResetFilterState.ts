import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
  filterContainsTitleState,
  filterMaxScore,
  filterMinScore,
  filterResponsible,
  querySearchTitleMapState,
  useQuerySearchFlgState,
} from "../atoms";

export const useResetFilterState = () => {
  const resetFilterResponsible = useResetRecoilState(filterResponsible);
  const resetFilterMinScore = useResetRecoilState(filterMinScore);
  const resetFilterMaxScore = useResetRecoilState(filterMaxScore);
  const resetFilterContainsTitle = useResetRecoilState(
    filterContainsTitleState
  );
  const resetQuerySearchTitleMap = useResetRecoilState(
    querySearchTitleMapState
  );
  const setQuerySearchFlg = useSetRecoilState(useQuerySearchFlgState);
  const resetState = () => {
    resetFilterResponsible();
    resetFilterMinScore();
    resetFilterMaxScore();
    resetFilterContainsTitle();
    resetQuerySearchTitleMap();

    // TODO: query文字列も全削除
    // 画面遷移を介さずURLからquery文字列を削除するためにはreact-router-domの導入が必要
    // 一旦フラグによる制御を行う
    // フラグは初期だけTrueで、一度（仮想的な）遷移が行われたらFalseに変更され、クエリによる絞り込みが行われない
    setQuerySearchFlg(false);
  };
  return resetState;
};
