import { Grid, Link, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSetRecoilState } from "recoil";
import {
  filterMaxScore,
  filterMinScore,
  filterResponsible,
  selectedCategoryState,
} from "../../../Domain/atoms";
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "稗田", label: "稗田", minWidth: 30 },
  { id: "水原", label: "水原", minWidth: 30 },
  {
    id: "泉",
    label: "泉",
    minWidth: 30,
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
export const SummaryTable = (props: {
  summaryData: {
    [key: number]: string[][];
  };
}) => {
  const summaryData = props.summaryData;
  let tableBodyList: JSX.Element[] = [];

  const setFilterResponsible = useSetRecoilState(filterResponsible);
  const setCategory = useSetRecoilState(selectedCategoryState);
  const setFilterMinScore = useSetRecoilState(filterMinScore);
  const setFilterMaxScore = useSetRecoilState(filterMaxScore);

  Object.keys(summaryData).forEach(
    (value: string, index: number, array: string[]) => {
      const row = summaryData[Number(value)];
      tableBodyList.push(
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={value}>
          <StyledTableCell key={"config"}>
            <Link
              underline="none"
              onClick={() => {
                // 点数ボタンが押されたら、その点数だけに絞って表示する
                setFilterMinScore(Number(value));
                setFilterMaxScore(Number(value));
                setCategory(0);
              }}
            >
              {value}
            </Link>
          </StyledTableCell>
          {columns.map((column, index) => {
            return (
              <StyledTableCell key={column.id} align={column.align}>
                {row[index].length !== 0 && (
                  <Link
                    underline="none"
                    onClick={() => {
                      // サマリの曲数が押されたら、対象の曲だけに絞って表示する
                      setFilterMinScore(Number(value));
                      setFilterMaxScore(Number(value));
                      setFilterResponsible(column.id);
                      setCategory(0);
                    }}
                  >
                    {row[index].length}
                  </Link>
                )}
                {row[index].length === 0 && 0}
              </StyledTableCell>
            );
          })}
        </StyledTableRow>
      );
    }
  );
  tableBodyList.reverse();
  return (
    <Grid container justifyContent="center" mt={3}>
      <Paper sx={{ width: "90%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 550 }}>
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
            <TableBody>{tableBodyList}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};
