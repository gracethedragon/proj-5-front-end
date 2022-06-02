import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import FilterView from "./filter.jsx";
import moment from "moment";
import LoadingSpinner from "./spinner.jsx";
import ShowOne from "./showone.jsx";
import axios from "axios";

import { instance } from "../connection/my-axios.mjs";

export default function ShowAll({
  token,
  transactionDetails,
  setTransactionDetails,
  setDisplay,
  setIsLoading,
  isLoading,
  parameters,
  setParameters,
  showAll
}) {
  console.log("token", token);
  console.log("loading", isLoading);

  // !isLoading ? setIsLoading(true) : null
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  const [statDetails, setStatDetails] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [noResults, setNoResults] = useState(false)
  const [checkedTxn, setCheckedTxn] = useState([])

  // filter params
  const [filter, setFilter] = useState(null);
  const [resetFilter, setResetFilter] = useState(false)
  const [viewname, setViewname] = useState("default viewname")
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [network, setNetwork] = useState([]);
  // to load page
  useEffect(() => {
    console.log("ran use effect");
    console.log(parameters)
    instance
      .get("/all-transactions", {
        params: { token, filterBy: { column: filter, parameters }},
      })
      .then((response) => {
        console.log(response.data, "ran");
        response.data.transactions.length >0 ? setNoResults(false) : setNoResults(true)
        setAllTransactionDetails(response.data.transactions);
        setStatDetails(response.data.stats);
        console.log(allTransactionDetails);
        setIsLoading(false)
        
      });
  }, [parameters, setResetFilter]);

  function showOne(dbtransactionId) {
    setIsLoading(true)
    console.log(dbtransactionId, " id");
    instance
      .get("/get-transaction", { params: { token, dbtransactionId } })
      .then((response) => {
        console.log(response.data, "response");
        const { transactions, stats } = response.data;
        setTransactionDetails({ transactions, stats });
        setDisplay("showone");
        console.log(transactionDetails);
        setIsLoading(false)
      });
  }

  

  const handleChange = (event) => {
    if (event.target.value === "all") {
      setFilter(null)
      setParameters(null)
      setIsLoading(true)    
    } else if (event.target.name === "viewname") {
      setViewname(event.target.value)
    } else {
    setFilter(event.target.value);
    console.log(filter);
    }
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
    setCheckedTxn(allTransactionDetails.map(transaction=> transaction.id))
    console.log(checkedTxn)
  }
  
  function createView(){
    console.log("view saved");
    console.log(checkedTxn, "checked txn details");
    instance.post("/new-view", { token, checkedTxn, viewname}).then((response) => {
      setDisplay("showallviews")
      setIsLoading(true)
      console.log(response);
    });
  }

  return (
    <div id="content-container">
      {isLoading ? <LoadingSpinner/> :
       (
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
              <select name="filter" onChange={handleChange} defaultValue={filter}>
                <option name="filterby" value="">
                  ---FilterBy---
                </option>
                <option name="filterby" value="all">
                  all
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
                setParameters={setParameters}
                setIsLoading={setIsLoading}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
                setNetwork={setNetwork}
                network={network}
              />
              {isFiltered &&!noResults &&
              <><input type="text" name="viewname" onChange={handleChange} placeholder={viewname}></input>
              <button onClick={createView}>Create View</button>
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
