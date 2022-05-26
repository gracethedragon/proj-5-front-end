import React, { useEffect, useState } from "react";
import { IndivGraph } from "./graph.jsx";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});
export default function ShowOne({ transactionDetails, setSubmit }) {
  function deleteTransaction(id) {
    console.log(id, "id");
    setSubmit(false);
    // instance.delete("/").then((respones) => console.log(response));
  }
  return (
    <div id="details-container">
      <div id="details-heading">
        <h6>Transaction Details</h6>
        <h6>{transactionDetails.data.transaction[0].hash}</h6>
        <button
          onClick={() =>
            deleteTransaction(transactionDetails.data.transaction[0].id)
          }
        >
          Delete
        </button>
      </div>
      <span>
        {transactionDetails.data.transaction[0].txValue.date} |{" "}
        {transactionDetails.data.transaction[0].transactionType} |{" "}
        {transactionDetails.data.transaction[0].qty} |{" "}
        {transactionDetails.data.transaction[0].network} |{" "}
        {transactionDetails.data.transaction[0].txValue.value} |{" "}
        {transactionDetails.data.transaction[0].currentValue.value} |
        {(transactionDetails.data.stats.unrealisedGL * 100).toFixed(2)}%
      </span>
      <div id="graph">
        <IndivGraph
          txValue={transactionDetails.data.transaction[0].txValue.value}
          curValue={transactionDetails.data.transaction[0].currentValue.value}
          txDate={transactionDetails.data.transaction[0].txValue.date}
          curDate={transactionDetails.data.transaction[0].currentValue.date}
        />
      </div>
    </div>
  );
}
