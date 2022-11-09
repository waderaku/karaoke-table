import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const SummaryChart = (props: {
  summaryData: {
    [key: number]: string[][];
  };
}) => {
  const options = {
    responsive: true,
    // plugins: {
    //   title: {
    //     display: true,
    //     text: "グラフタイトル",
    //   },
    // },
  };
  const summaryData = props.summaryData;
  const labels = Object.keys(summaryData);
  const datasets = [
    {
      label: "稗田",
      data: labels.map((score) => summaryData[Number(score)][0].length),
      borderColor: "rgb(42, 164, 219)",
      backgroundColor: "rgba(42, 164, 219, 0.5)",
    },
    {
      label: "水原",
      data: labels.map((score) => summaryData[Number(score)][1].length),
      borderColor: "rgb(174, 174, 174)",
      backgroundColor: "rgba(174, 174, 174, 0.5)",
    },
    {
      label: "泉",
      data: labels.map((score) => summaryData[Number(score)][2].length),
      borderColor: "rgb(238, 85, 183)",
      backgroundColor: "rgba(238, 85, 183, 0.5)",
    },
  ];
  return (
    <div className="App">
      <Line options={options} data={{ labels: labels, datasets: datasets }} />
    </div>
  );
};
