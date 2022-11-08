import { CircularProgress, Grid, Modal, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css";
import { theme } from "./Component/BackgroundImage/BackgroundImage";
import { Header } from "./Component/Header";
import { ImageArea } from "./Component/ImageArea/ImageArea";
import { LoveliveTable } from "./Component/LoveliveTable/LoveliveTable";
import { SearchArea } from "./Component/Search/SearchArea";
import { Summary } from "./Component/Summary/Summary";
import {
  isLoadingState,
  querySearchTitleMapState,
  selectedCategoryState,
  tableData,
} from "./Domain/atoms";
import { fetchTableData } from "./Infrastructer/tableDataRepository";

const style = {
  position: "fixed",
  inset: 0,
  margin: "auto",
};

const App = () => {
  // query情報を取得し、格納
  // queryに何か検索キーがあればそのタイトルだけでフィルタリング
  const queryStr = window.location.search;
  const setQuerySeachTitleMap = useSetRecoilState(querySearchTitleMapState);
  if (queryStr) {
    const queryList = queryStr.split("&");
    const querySearchMap = queryList.map((query) =>
      decodeURIComponent(query.split("=")[1])
    );
    setQuerySeachTitleMap(querySearchMap);
  }

  // APIを叩いて全ての曲データを取得する
  // 初期のみ挙動するようにしてAPIを叩く数を最小化
  const setTableData = useSetRecoilState(tableData);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  useEffect(() => {
    fetchTableData().then((data) => {
      setTableData(data);
    });
  }, []);

  // ラブライブのカテゴリの場合だけグループ毎の遷移ができる画像エリアを表示する
  const imageArea =
    selectedCategory <= 4 && selectedCategory > 0 ? <ImageArea /> : null;
  const isLoading = useRecoilValue(isLoadingState);

  // カテゴリがsummaryを指していた場合のみ、サマリ用のコンポーネントを表示し、
  // それ以外の場合はデータテーブルを表示する
  const mainArea = selectedCategory == 99 ? <Summary /> : <LoveliveTable />;

  return (
    <ThemeProvider theme={theme(selectedCategory)}>
      <CssBaseline />
      <div className="App">
        <div>
          <Header />
          {imageArea}
          <div>
            {selectedCategory !== 99 && <SearchArea />}
            <Grid>{mainArea}</Grid>
          </div>
        </div>
      </div>
      <Modal
        open={isLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CircularProgress sx={style} size={100} color={"primary"} />
      </Modal>
    </ThemeProvider>
  );
};

export default App;
