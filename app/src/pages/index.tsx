import dynamic from "next/dynamic";
import React from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { tableData } from "../Domain/atoms";
import { TableRaw } from "../Domain/type";
import { fetchTableData } from "../Infrastructer/tableDataRepository";
export async function getServerSideProps(context: any) {
  const tableData = await fetchTableData().then((data) => data);
  return { props: { tableData: tableData } };
}

const Home = (props: {
  tableData: TableRaw[] | ((currVal: TableRaw[]) => TableRaw[]);
}) => {
  const App = dynamic<React.ReactNode>(
    () => import("../App").then((module) => module.App),
    { ssr: false }
  );
  const setTableData = useSetRecoilState(tableData);
  setTableData(props.tableData);
  return <App></App>;
};
const HomePage = (props: { tableData: TableRaw[] }) => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <Home tableData={props.tableData} />
      </RecoilRoot>
    </React.StrictMode>
  );
};

export default HomePage;
