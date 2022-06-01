import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import FilterView from "./filter.jsx";
import moment from "moment";
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
  const [filter, setFilter] = useState(null);
  const [parameters ,setParameters] = useState(null)

  useEffect(() => {
    console.log("ran use effect");
    instance
      .get("/all-transactions", {
        params: { token, filterBy: { column: filter, parameters }},
      })
      .then((response) => {
        console.log(response.data, "ran");
        response.data.transactions.length >0 ? setNoResults(false) : null
        setAllTransactionDetails(response.data.transactions);
        setStatDetails(response.data.stats);
        console.log(allTransactionDetails);
        setDisplay("showall");
      });
  }, [parameters]);

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

  function checkAll(){
    console.log(allTransactionDetails)
    // setCheckedTxn(transactionDetails.map(transaction=> transaction.id))
    console.log(checkedTxn)
  }

  return (
    <div id="content-container">
      {display === "showall" && (
        <>
          <div id="details-container">
            <div id="summary-container">
              <h6 className="details-header">Portfolio to date</h6>
              <div>
                Outlay TD: {statDetails.outlay} | Unrealised Rev:{" "}
                {statDetails.unrealrev} | Unrealised G/L:{" "}
                
                {(statDetails.unrealgl*100).toFixed(2)}%
              </div>
              <div>
                Sale Oulay: {statDetails.saleoutlay} | Actual Rev:{" "}
                {statDetails.actualrev} | Actual G/L: {(statDetails.actualgl*100).toFixed(2)}%
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
                setAllTransactionDetails={setAllTransactionDetails}
                setNoResults={setNoResults}
                
                setParameters={setParameters}
              />
              {isFiltered &&
              <><input type="text" placeholder="viewname"></input>
              <button>Create View</button>
              <button onClick={()=>checkAll()}>Select All</button></>
              }
            </div>
            <div id="transaction-container">
              {noResults && 
              <h6>no results</h6>  
              }
              {!noResults && allTransactionDetails.map((detail) => {
                return (
                  <form>
                  <div key={detail.id} className="transaction">
                    {isFiltered &&
                    <input type="checkbox" value={detail.id} onClick={()=>addChecked(detail.id)}/>}
                    <span className="details" onClick={() => showOne(detail.id)}>
                      {moment(detail.txValue.date).format("DD/MM/YY")} | {detail.transactionType} |{" "}
                      {detail.qty} {detail.network} | {((detail.currentValue.value- detail.txValue.value)/detail.currentValue.value*100).toFixed(2)}% 
                      
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
