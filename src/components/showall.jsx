import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

export default function ShowAll() {
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  const [statDetails, setStatDetails] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  useEffect(() => {
    instance.get("/all-transactions").then((response) => {
      console.log(response.data, "ran");
      setAllTransactionDetails(response.data.transaction);
      setStatDetails(response.data.stats);
      console.log(allTransactionDetails);
      setShowTransactions(true);
    });
  }, []);

  function showOne(id) {
    console.log(id, " id");
    // instance
    //   .get("/view-transaction", { id /** , token*/ })
    //   .then((response) => console.log(response));
  }

  return (
    <div>
      <h6>Portfolio to date</h6>
      {showTransactions && (
        <>
          <div id="summary-container">
            <div>
              Outlay TD: {statDetails.outlay} | Unrealised Rev:{" "}
              {statDetails.unrealrev} | Unrealised G/L:{" "}
              {statDetails.unrealgl.toFixed(2)}%
            </div>
            <div>
              Sale Oulay: {statDetails.saleoutlay} | Actual Rev:{" "}
              {statDetails.actualrev} | Actual G/L: {statDetails.actualgl}
            </div>
          </div>
          <div id="transaction-container">
            {allTransactionDetails.map((detail) => {
              return (
                <div key={detail.id} className="transaction">
                  <span onClick={() => showOne(detail.id)}>
                    {detail.txValue.date} | {detail.transactionType} |{" "}
                    {detail.qty} | {detail.network} | {detail.txValue.value} |{" "}
                    {detail.currentValue.value} |
                  </span>
                </div>
              );
            })}
          </div>
          <div id="graph">
            <OverallGraph
              outlayTD={statDetails.outlay}
              unrealisedRev={statDetails.unrealrev}
            />
          </div>
        </>
      )}
    </div>
  );
}
