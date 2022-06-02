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
import moment from 'moment'

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
      
    },
  },
};

export function IndivGraph(graphData) {
  console.log(graphData, typeof graphData.boughtValue, graphData.txValue);
  const labels = [null,moment(graphData.boughtDate).format('DD-MM-YY'), moment(graphData.soldDate).format('DD-MM-YY'), null];
  const data = {
    labels,
    datasets: [
      {
        label: `Total Value (USD)`,
        data: [null, graphData.boughtValue, graphData.soldValue, null],
        backgroundColor:"#80c0c0",
        pointRadius: 6,
      },
     
    ],
  };
  return <Line options={options} data={data} />;
}

export function OverallGraph(graphData) {
  console.log(graphData);
  const labels = [null, "Cost", "Cur Val", null];
  let data;
  if(graphData.totalBoughtValue > 0){
  data = {
    labels,
    datasets: [
      {
        label: "Total Value (USD)",
        data: [null, graphData.totalBoughtValue, graphData.totalSoldValue, null],
        backgroundColor:"#80c0c0",
        pointRadius: 6,
      },
      ],
    };
  } else {
    data = {
    labels,
    datasets: [
      {
        label: "Total Value (USD)",
        // data: txnData,
        data: [null, null, null, null],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 10,
      },
      ],
    };
  }
  return <Line options={options} data={data} />;
}
