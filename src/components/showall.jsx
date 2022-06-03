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
  setTransactionDetails,
  setDisplay,
  setIsLoading,
  isLoading,
  parameters,
  setParameters,
  allTransactionDetails,
  setAllTransactionDetails,
  toggleShowAll,
  filter, 
  setFilter,
  getall,
  setGetall
}) {
  console.log("token", token);
  console.log("loading", isLoading, toggleShowAll);
  
  const [portfolioChange, setPortfolioChange] = useState(null)
  const [noResults, setNoResults] = useState(false)

  //view params
  const [checkedTxn, setCheckedTxn] = useState([])

  // // filter params
  // const [filter, setFilter] = useState(null);

  // const [statDetails, setStatDetails] =useState([])
  const [viewname, setViewname] = useState("Default Viewname")
  const [isFiltered, setIsFiltered] = useState(false);
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [network, setNetwork] = useState([]);
  
  
  // to load page
  useEffect(() => {
    setIsLoading(true)  
    console.log("ran use effect");
    console.log(token, parameters, filter)
    if( parameters === null && getall === false) {
      setIsFiltered(false)
    } 
    
    instance
      .get("/all-transactions", {
        params: { token, filterBy: { column: filter, parameters }},
      })
      .then((response) => {
        console.log(response.data, "ran");
        response.data.transactions.length >0 ? setNoResults(false) : setNoResults(true)

        const {stats, transactions} = response.data
        transactions.sort((a,b)=> new Date(b.txValue.date) - new Date(a.txValue.date))
        
        setAllTransactionDetails({stats, transactions});
        setPortfolioChange((((response.data.stats.totalSoldValue - response.data.stats.totalBoughtValue)/response.data.stats.totalSoldValue)*100));
        console.log(allTransactionDetails);
        
        setIsLoading(false)
        
      });
  }, [parameters,isFiltered, toggleShowAll]); 

  

  function showOne(dbtransactionId) {
    setIsLoading(true)
    console.log(dbtransactionId, " id");
    instance
      .get("/get-transaction", { params: { token, dbtransactionId } })
      .then((response) => {
        console.log(response.data, "response");
        const { transactions, stats } = response.data;
        
        setTransactionDetails({ transactions, stats });
        console.log(transactions[0].txValue.date)
        setDisplay("showone");
        setIsLoading(false)
      });
  }

  

  const handleChange = (event) => {
    if (event.target.value === "all") {
      setFilter(null)
      setParameters(null)
      setIsFiltered(true)
      setIsLoading(true)    
      setGetall(true)
    } else if (event.target.name === "viewname") {
      setViewname(event.target.value)
    } else {
    setFilter(event.target.value);
    console.log(filter);
    }
  };

  function toggleCheck(id){
    console.log(checkedTxn)
    if(checkedTxn.includes(id)){
      const nextCheckedTxn = [...checkedTxn];

      const position = nextCheckedTxn.indexOf(id)
      nextCheckedTxn.splice(position, 1)

      setCheckedTxn(nextCheckedTxn);
    } else {
      setCheckedTxn([...checkedTxn, id])
    }
    console.log(checkedTxn)
  }

  function checkAll(){
    console.log(allTransactionDetails.transactions)
    setCheckedTxn(allTransactionDetails.transactions.map(transaction=> transaction.id))
    console.log(checkedTxn)
  }
  
  function createView(){
    console.log("view saved");
    console.log(checkedTxn, "checked txn details");
    instance.post("/new-view", { token, transactionIds:checkedTxn, viewname}).then((response) => {
      setDisplay("showallviews")
      setIsLoading(true)
      console.log(response);
    }).catch((error)=>{
      console.log(error)
        setDisplay("errormsg")
    });
  }

  return (
    <div id="content-container">
      {isLoading ? <LoadingSpinner/> :
       (
        <>
          <div id="details-container">      
            <div id="filter">
              <select name="filter" onChange={handleChange} value={filter? filter : ""}  >
                <option name="filterby" value="">
                  ---FilterBy---
                </option>
                <option name="filterby" value="all">
                  All
                </option>
                <option name="network" value="Network">
                  Network
                </option>
                <option name="date" value="Date">
                  Transacted Date
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
              <><input type="text" name="viewname" onChange={handleChange} placeholder={viewname}></input> {" "}
              <button onClick={createView}>Create View</button> {" "}
              <button onClick={()=>checkAll()}>Select All</button></>
              }
            </div>
            <div id="transaction-container">
              {noResults && 
              <h6>no results</h6>  
              }
              {!noResults && allTransactionDetails.transactions.map((detail) => {
                return (
                  <form>
                  <div key={detail.id} className="transaction">
                    {isFiltered &&
                    <input type="checkbox" value={detail.id} 
                    onChange={()=>{}}
                    checked={checkedTxn.includes(detail.id)} 
                    onClick={()=>toggleCheck(detail.id)}/>
                    }
                    <span className={detail.transactionType} onClick={() => showOne(detail.id)}>
                      {detail.transactionType === "BUY"? `Bought`: `Sold`} {" "}
                      {detail.qty.toFixed(8)} {detail.token}  on {moment(detail.txValue.date).format("DD-MM-YY")} | 
                      

                      {((detail.soldValue- detail.boughtValue)/detail.soldValue*100).toFixed(2)}% 
                    </span>
                  </div>
                  </form>
                )
              })}
            
            </div>
          </div>
          <div id="graph">
             
            <div id="summary-container">
              <h6 className="details-header">Portfolio</h6> 
               {portfolioChange === null? null: portfolioChange< 0 ? <span className="text-warning portfolio-details">{portfolioChange.toFixed(2)}%</span> : <span className="text-primary portfolio-details">{portfolioChange.toFixed(2)}%</span>}

              <div className ="portfolio-container">
                
                <div>
                <span >Cost to date:</span> <br/><span className="text-secondary portfolio-details">USD {allTransactionDetails.stats.totalBoughtValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span><br/>
              
                </div>
                <div>
                <span >Current value:</span><br/>
                <span className=" portfolio-details">USD {allTransactionDetails.stats.totalSoldValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} </span>
                </div>
               
              </div>
              
            </div>
            <OverallGraph
              totalBoughtValue = {allTransactionDetails.stats.totalBoughtValue}
              totalSoldValue = {allTransactionDetails.stats.totalSoldValue}
            />
          </div>
        </>
      )} 
    </div>
  );
}
