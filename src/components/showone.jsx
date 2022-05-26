import React, { useEffect, useState } from "react";
import { IndivGraph } from "./graph.jsx";

import { instance } from "../connection/my-axios.mjs";

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
        <h6>{transactionDetails.transactions[0].hash}</h6>
        <button
          onClick={() =>
            deleteTransaction(transactionDetails.transactions[0].id)
          }
        >
          Delete
        </button>
      </div>
      <span>
        {transactionDetails.transactions[0].txValue.date} |{" "}
        {transactionDetails.transactions[0].transactionType} |{" "}
        {transactionDetails.transactions[0].qty} |{" "}
        {transactionDetails.transactions[0].network} |{" "}
        {transactionDetails.transactions[0].txValue.value} |{" "}
        {transactionDetails.transactions[0].currentValue.value} |
        {(transactionDetails.stats.unrealgl * 100).toFixed(2)}%
      </span>
      <div id="graph">
        <IndivGraph
          txValue={transactionDetails.transactions[0].txValue.value}
          curValue={transactionDetails.transactions[0].currentValue.value}
          txDate={transactionDetails.transactions[0].txValue.date}
          curDate={transactionDetails.transactions[0].currentValue.date}
        />
      </div>
    </div>
  );
}
