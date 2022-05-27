import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import FilterView from "./filter.jsx";
import axios from "axios";

import { instance } from "../connection/my-axios.mjs";

export default function ShowAll({ token }) {
  console.log("token", token);
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  const [statDetails, setStatDetails] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  useEffect(() => {
    instance
      .get("/all-transactions", {
        params: { token },
      })
      .then((response) => {
        console.log(response.data, "ran");
        setAllTransactionDetails(response.data.transactions);
        setStatDetails(response.data.stats);
        console.log(allTransactionDetails);
        setShowTransactions(true);
      });
  }, []);

  function showOne(dbtransactionId) {
    console.log(dbtransactionId, " id");
    instance
      .get("/get-transaction", { params: { token, dbtransactionId } })
      .then((response) => console.log(response));
  }

  const [filter, setFilter] = useState(null);

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  };

  return (
    <div id="content-container">
      {showTransactions && (
        <>
          <div id="details-container">
            <div id="summary-container">
              <h6>Portfolio to date</h6>
              <div>
                Outlay TD: {statDetails.outlay} | Unrealised Rev:{" "}
                {statDetails.unrealrev} | Unrealised G/L:{" "}
                {/* {statDetails.unrealgl.toFixed(2)}% */}
                {statDetails.unrealgl}%
              </div>
              <div>
                Sale Oulay: {statDetails.saleoutlay} | Actual Rev:{" "}
                {statDetails.actualrev} | Actual G/L: {statDetails.actualgl}
              </div>
            </div>
            <div id="filter">
              <select name="filter" onChange={handleChange}>
                <option name="filterby" value="">
                  ---FilterBy---
                </option>
                <option name="network" value="Network">
                  network
                </option>
                <option name="date" value="Date">
                  date
                </option>
              </select>
              <FilterView filter={filter} />
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
