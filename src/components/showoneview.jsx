import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import FilterView from "./filter.jsx";
import ShowOne from "./showone.jsx";
import axios from "axios";

import { instance } from "../connection/my-axios.mjs";

export default function ShowOneView({
  viewId,
  token,
  transactionDetails,
  setTransactionDetails,
  setDisplay,
  display,
  setShowAllViews,
}) {
  useEffect(() => {
    console.log("ran use effect", transactionDetails, display);
  }, []);

  function showOne(dbtransactionId) {
    console.log(dbtransactionId, " id");
    instance
      .get("/get-transaction", { params: { token, dbtransactionId } })
      .then((response) => {
        console.log(response.data, "response");
        const { transactions, stats } = response.data;
        const transactionData = { transactions, stats };
        console.log(transactionData, "txn deets");
        setTransactionDetails({ transactions, stats });
        setDisplay("showone");
        console.log(transactionDetails);
      });
  }

  function deleteView(viewId) {
    instance.delete("/view", { params: { token, viewId } }).then((response) => {
      console.log(response, "response");
      setDisplay("showallviews");
    });
  }

  return (
    <div id="content-container">
      {display === "showoneview" && (
        <>
          <div id="details-container">
            <div id="summary-container">
              <h6>View portfolio to date</h6>
              <div>
                <button>Edit View Name</button>
                <button onClick={() => deleteView(viewId)}>Delete View</button>
              </div>
              <div>
                Outlay TD: {transactionDetails.stats.outlay} | Unrealised Rev:{" "}
                {transactionDetails.stats.unrealrev} | Unrealised G/L:{" "}
                {/* {statDetails.unrealgl.toFixed(2)}% */}
                {transactionDetails.stats.unrealgl}%
              </div>
              <div>
                Sale Oulay: {transactionDetails.stats.saleoutlay} | Actual Rev:{" "}
                {transactionDetails.stats.actualrev} | Actual G/L:{" "}
                {transactionDetails.stats.actualgl}
              </div>
            </div>

            <div id="transaction-container">
              {transactionDetails.transactions.map((transaction) => {
                return (
                  <div key={transaction.id} className="transaction">
                    <span onClick={() => showOne(transaction.id)}>
                      {transaction.txValue.date} | {transaction.transactionType}{" "}
                      | {transaction.qty} | {transaction.network} |{" "}
                      {transaction.txValue.value} |{" "}
                      {transaction.currentValue.value} |
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="graph">
            <OverallGraph
              outlayTD={transactionDetails.stats.outlay}
              unrealisedRev={transactionDetails.stats.unrealrev}
            />
          </div>
        </>
      )}
    </div>
  );
}
