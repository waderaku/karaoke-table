import { useRecoilState } from "recoil"
import { targetCharacterState } from "../atoms"

export const useTargetCharacter = () => {
    const [targetCharacter, setTargetCharacter] = useRecoilState(targetCharacterState)
    return [targetCharacter, setTargetCharacter]
}