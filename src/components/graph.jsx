import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
  const labels = ["value (USD)"];
  const data = {
    labels,
    datasets: [
      {
        label: `TxDate: ${graphData.txDate} `,
        // data: txnData,
        data: [graphData.txValue],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: `CurDate: ${graphData.curDate}`,
        data: [graphData.curValue],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export function OverallGraph(graphData) {
  console.log(graphData);
  const labels = ["value (USD)"];
  const data = {
    labels,
    datasets: [
      {
        label: "Outlay TD",
        // data: txnData,
        data: [graphData.outlayTD],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Unrealised Rev",
        data: [graphData.unrealisedRev],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
