import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import FilterView from "./filter.jsx";
import ShowOne from "./showone.jsx";
import axios from "axios";

import { instance } from "../connection/my-axios.mjs";

export default function ShowAll({
  token,
  transactionDetails,
  setTransactionDetails,
  setDisplay,
  display,
}) {
  console.log("token", token);
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  const [statDetails, setStatDetails] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [noResults, setNoResults] = useState(false)
  const [checkedTxn, setCheckedTxn] = useState([])

  useEffect(() => {
    console.log("ran use effect");
    instance
      .get("/all-transactions", {
        params: { token },
      })
      .then((response) => {
        console.log(response.data, "ran");
        response.data.transactions.length >0 ? setNoResults(false) : null
        setAllTransactionDetails(response.data.transactions);
        setStatDetails(response.data.stats);
        console.log(allTransactionDetails);
        setDisplay("showall");
      });
  }, [isFiltered]);

  function showOne(dbtransactionId) {
    console.log(dbtransactionId, " id");
    instance
      .get("/get-transaction", { params: { token, dbtransactionId } })
      .then((response) => {
        console.log(response.data, "response");
        const { transactions, stats } = response.data;
        const transactionData = { transactions, stats };
        console.log(transactionDetails, "txn deets");
        setTransactionDetails({ transactions, stats });
        setDisplay("showone");
        console.log(transactionDetails);
      });
  }

  const [filter, setFilter] = useState(null);

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  };

  function addChecked(id){
    if(checkedTxn.includes(id)){
      const position = checkedTxn.indexOf(id)
      checkedTxn.splice(position, 1)
    } else {
      setCheckedTxn([...checkedTxn, id])
    }
    console.log(checkedTxn)
  }

  return (
    <div id="content-container">
      {display === "showall" && (
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
              <FilterView
                filter={filter}
                setIsFiltered={setIsFiltered}
                token={token}
                allTransactionDetails={allTransactionDetails}
                setNoResults={setNoResults}
              />
            </div>
            <div id="transaction-container">
              {noResults && 
              <h6>no results</h6>  
              }
              {!noResults && allTransactionDetails.map((detail) => {
                return (
                  <form>
                  <div key={detail.id} className="transaction">
                    <input type="checkbox" value={detail.id} onClick={()=>addChecked(detail.id)}/>
                    <span onClick={() => showOne(detail.id)}>
                      {detail.txValue.date} | {detail.transactionType} |{" "}
                      {detail.qty} | {detail.network} | {detail.txValue.value} |{" "}
                      {detail.currentValue.value} |
                    </span>
                  </div>
                  </form>
                )
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
