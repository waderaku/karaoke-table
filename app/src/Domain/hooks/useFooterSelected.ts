import { useRecoilState } from "recoil";
import { footerValueState } from "../atoms";
import { useResetState } from "./useResetState";

export const useFooterSelected = () => {
  const [footerValue, setFooterValue] = useRecoilState(footerValueState);

  const resetState = useResetState();
  const onChange = (event: any, newValue: any) => {
    setFooterValue(newValue);
    resetState();
  };
  return { footerValue, onChange };
};
