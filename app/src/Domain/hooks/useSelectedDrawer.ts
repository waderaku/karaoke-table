import { useRecoilValue, useResetRecoilState } from "recoil";
import { drawerValueState } from "../atoms";
import { DrawerValue } from "../type";

export const useSelectedDrawer = (): [DrawerValue, boolean, () => void] => {
  const drawerValue = useRecoilValue(drawerValueState);
  const resetDrawerValue = useResetRecoilState(drawerValueState);
  return [
    drawerValue,
    drawerValue !== DrawerValue.TEST,
    () => resetDrawerValue(),
  ];
};
