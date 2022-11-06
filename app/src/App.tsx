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
  console.log(decodeURI("%26"));
  const setQuerySeachTitleMap = useSetRecoilState(querySearchTitleMapState);
  if (queryStr) {
    const queryList = queryStr.split("&");
    const querySearchMap = queryList.map((query) =>
      decodeURIComponent(query.split("=")[1])
    );
    console.log(querySearchMap);
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
  return (
    <ThemeProvider theme={theme(selectedCategory)}>
      <CssBaseline />
      <div className="App">
        {/* <BackgroundImage /> */}
        <div
        // style={{
        //   position: "absolute",
        //   margin: "auto",
        //   top: 0,
        //   bottom: 0,
        // }}
        >
          <Header />
          {imageArea}
          {/* <div style={{ backgroundColor: "white", opacity: 0.9 }}> */}
          <div>
            <SearchArea />
            <Grid>
              {/* <DataGridTable></DataGridTable> */}
              <LoveliveTable />
            </Grid>
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
