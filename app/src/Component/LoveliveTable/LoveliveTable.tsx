import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid, Modal, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filterContainsTitleState,
  filterMaxScore,
  filterMinScore,
  filterResponsible,
  querySearchTitleMapState,
  selectedCategoryState,
  selectedSong,
  selectedSongTitleState,
  tableData,
} from "../../Domain/atoms";
import { AddSongModal } from "./AddSongModal/AddSongModal";
const style = {
  fontSize: "350%",
  position: "fixed",
  right: "8%",
  bottom: "10%",
};
interface Column {
  id: "score" | "responsible" | "title" | "artist";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "score", label: "点数", minWidth: 30 },
  { id: "responsible", label: "担当", minWidth: 30 },
  {
    id: "title",
    label: "曲名",
    minWidth: 80,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "artist",
    label: "アーティスト",
    minWidth: 30,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const LoveliveTable = () => {
  const filterResponsibleValue = useRecoilValue(filterResponsible);
  const filterMinScoreValue = useRecoilValue(filterMinScore);
  const filterMaxScoreValue = useRecoilValue(filterMaxScore);
  const filterContainsTitle = useRecoilValue(filterContainsTitleState);
  const querySearchTitleMap = useRecoilValue(querySearchTitleMapState);
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
      (row) =>
        row.title &&
        row.title.toLowerCase().includes(filterContainsTitle.toLowerCase())
    );
  }
  if (querySearchTitleMap.length != 0) {
    filterTableData = filterTableData.filter((row) =>
      querySearchTitleMap.includes(row.title)
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const targetSong = useRecoilValue(selectedSong);
  const setSelectedSongTitle = useSetRecoilState(selectedSongTitleState);
  return (
    <>
      <Grid container justifyContent="center" mt={3}>
        <Paper sx={{ width: "90%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "white" }}>
                <TableRow>
                  <StyledTableCell
                    key={"config"}
                    style={{ minWidth: 10 }}
                  ></StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterTableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.title}
                      >
                        <StyledTableCell
                          key={"config"}
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedSongTitle(row.title);
                          }}
                        >
                          <MoreVertIcon />
                        </StyledTableCell>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              {value}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filterTableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <AddSongModal
          song={targetSong}
          closeModal={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
      <AddCircleIcon
        color="success"
        sx={style}
        onClick={() => {
          setIsOpen(true);
          setSelectedSongTitle("");
        }}
      />
    </>
  );
};
