import { useRecoilValue } from "recoil"
import { isLoadingState } from "../atoms"

export const useLoading = () => {
    const isLoading = useRecoilValue(isLoadingState)
    return isLoading
}