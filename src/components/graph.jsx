import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export function IndivGraph(graphData) {
  console.log(graphData, typeof graphData.txValue, graphData.txValue);
  const labels = [null, "value (USD)", null];
  const data = {
    labels,
    datasets: [
      {
        label: `TxDate: ${graphData.txDate} `,
        // data: txnData,
        data: [null, graphData.txValue, null],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 10,
      },
      {
        label: `CurDate: ${graphData.curDate}`,
        data: [null, graphData.curValue, null],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointRadius: 10,
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export function OverallGraph(graphData) {
  console.log(graphData);
  const labels = [null, "value (USD)", null];
  const data = {
    labels,
    datasets: [
      {
        label: "Outlay TD",
        // data: txnData,
        data: [null, graphData.outlayTD, null],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Unrealised Rev",
        data: [null, graphData.unrealisedRev, null],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
