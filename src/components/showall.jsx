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
    axios
      .get("/all-transactions", {
        params: { token },
      })
      .then((response) => {
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
    //   .get("/view-transaction", { params: { token, id } })
    //   .then((response) => console.log(response));
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
                {statDetails.unrealgl.toFixed(2)}%
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
                <option name="network" value="network">
                  network
                </option>
                <option name="date" value="date">
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
