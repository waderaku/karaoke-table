import { Route, Routes } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { backHeaderPropState, headerViewFlgState } from "../Domain/atoms";
import { useSelectedCharacter } from "../Domain/hooks/useSelectedCharacter";
import { useSelectedDrawer } from "../Domain/hooks/useSelectedDrawer";
import { BackHeader } from "./BackHeader";
import { CreateQuizList } from "./CreateQuizList/CreateQuizList";
import { Menu } from "./Menu";
import { CompleteQuiz } from "./Quiz/CompleteQuiz";
import { Quiz } from "./Quiz/Quiz";

export const MainContent = () => {
  const [drawerValue, isSelectedDrawer, cancelSelectedDrawer] =
    useSelectedDrawer();
  const [targetCharacterId, isSelectedTarget, isCompletedQuiz] =
    useSelectedCharacter();
  const setHeaderViewFlg = useSetRecoilState(headerViewFlgState);
  const [backHeaderProp, setBackHeaderProp] =
    useRecoilState(backHeaderPropState);
  if (isSelectedDrawer) {
    setHeaderViewFlg(false);

    const back = () => {
      cancelSelectedDrawer();
      setHeaderViewFlg(true);
    };
    if (backHeaderProp.textList.length === 0) {
      setBackHeaderProp({
        backList: [...backHeaderProp.backList, back],
        textList: [...backHeaderProp.textList, "作問"],
      });
    }
    return (
      <>
        <BackHeader />
        <CreateQuizList></CreateQuizList>
      </>
    );
  }
  <Routes>
    <Route path="/quiz">
      <Route
        path="/:caracterId/complete"
        element={<CompleteQuiz characterId={targetCharacterId}></CompleteQuiz>}
      />
      <Route
        path="/:caracterId"
        element={<Quiz characterId={targetCharacterId}></Quiz>}
      />
    </Route>
    <Route path="/" element={<Menu></Menu>} />
  </Routes>;
  if (isSelectedTarget) {
    if (isCompletedQuiz) {
      return <CompleteQuiz characterId={targetCharacterId}></CompleteQuiz>;
    } else {
      return <Quiz characterId={targetCharacterId}></Quiz>;
    }
  } else {
    return <Menu></Menu>;
  }
};
