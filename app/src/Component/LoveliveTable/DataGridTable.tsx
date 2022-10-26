import MoreVertIcon from "@mui/icons-material/MoreVert";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridValueSetterParams } from "@mui/x-data-grid";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filterContainsTitleState,
  filterMaxScore,
  filterMinScore,
  filterResponsible,
  selectedCategoryState,
  tableData,
} from "../../Domain/atoms";
import { TableRaw } from "../../Domain/type";
import {
  fetchTableData,
  updateTableData,
} from "../../Infrastructer/tableDataRepository";
const ODD_OPACITY = 0.2;
const style = {
  fontSize: "350%",
  position: "fixed",
  right: "8%",
  bottom: "10%",
};
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  // ヘッダー
  [`& .${gridClasses.columnHeader}`]: {
    backgroundColor: theme.palette.grey[300],
  },
  // フッター
  [`& .${gridClasses.footerContainer}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      // "&:hover, &.Mui-hovered": {
      //   backgroundColor: alpha(
      //     theme.palette.primary.main,
      //     ODD_OPACITY +
      //       theme.palette.action.selectedOpacity +
      //       theme.palette.action.hoverOpacity
      //   ),
      //   // Reset on touch devices, it doesn't add specificity
      //   "@media (hover: none)": {
      //     backgroundColor: alpha(
      //       theme.palette.primary.main,
      //       ODD_OPACITY + theme.palette.action.selectedOpacity
      //     ),
      //   },
      // },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: theme.palette.grey[100],

    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
    },
  },
}));

export const DataGridTable = () => {
  const filterResponsibleValue = useRecoilValue(filterResponsible);
  const filterMinScoreValue = useRecoilValue(filterMinScore);
  const filterMaxScoreValue = useRecoilValue(filterMaxScore);
  const filterContainsTitle = useRecoilValue(filterContainsTitleState);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const [tableDataValue, setTableData] = useRecoilState(tableData);

  let filterTableData = tableDataValue;

  if (selectedCategory !== 0) {
    filterTableData = filterTableData.filter(
      (row) => selectedCategory == row.category
    );
  }
  if (filterResponsibleValue) {
    if (filterResponsibleValue === "未担当") {
      filterTableData = filterTableData.filter((row) => !row.responsible);
    } else {
      filterTableData = filterTableData.filter(
        (row) => filterResponsibleValue === row.responsible
      );
    }
  }
  if (filterMinScoreValue) {
    filterTableData = filterTableData.filter(
      (row) => row.score && filterMinScoreValue <= row.score
    );
  }
  if (filterMaxScoreValue) {
    filterTableData = filterTableData.filter(
      (row) => row.score && filterMaxScoreValue >= row.score
    );
  }
  if (filterContainsTitle) {
    filterTableData = filterTableData.filter(
      (row) => row.title && row.title.includes(filterContainsTitle)
    );
  }

  const rawData = filterTableData.map((value: TableRaw) => {
    return { ...value, config: <MoreVertIcon /> };
  });
  return (
    <>
      <div style={{ height: 400, display: "flex" }}>
        <StripedDataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          sx={{ m: 2 }}
          getRowId={(row) => row.title}
          rows={rawData}
          columns={[
            {
              field: "config",
              headerName: "編集",
              width: 150,
            },
            {
              field: "score",
              headerName: "点数",
              width: 40,
              editable: true,
              type: "number",
              valueSetter: (params: GridValueSetterParams) => {
                if (params.value != params.row.score) {
                  updateTableData(params.row, "score", params.value);
                  fetchTableData().then((data) => {
                    setTableData(data);
                  });
                }
                return { ...params.row, score: params.value };
              },
            },
            {
              field: "responsible",
              headerName: "担当",
              width: 40,
              editable: true,
              valueSetter: (params: GridValueSetterParams) => {
                if (params.value != params.row.responsible) {
                  updateTableData(params.row, "responsible", params.value);
                  fetchTableData().then((data) => {
                    setTableData(data);
                  });
                }
                return { ...params.row, responsible: params.value };
              },
            },
            {
              field: "title",
              headerName: "曲名",
              width: 180,
            },
            {
              field: "artist",
              headerName: "アーティスト",
              width: 150,
            },
          ]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
      {/* <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <AddSongModal />
      </Modal>
      <AddCircleIcon
        color="success"
        sx={style}
        onClick={() => {
          setIsOpen(true);
        }}
      /> */}
    </>
  );
};
