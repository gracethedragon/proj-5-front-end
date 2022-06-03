import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import LoadingSpinner from "./spinner.jsx";
import moment from 'moment'
import FilterView from "./filter.jsx";
import ShowOne from "./showone.jsx";
import axios from "axios";

import { instance } from "../connection/my-axios.mjs";

export default function ShowOneView({
  viewId,
  token,
  setTransactionDetails,
  setDisplay,
  display,
  allTransactionDetails,
  isLoading,
  setIsLoading, 
  viewname,
  setViewname
}) {
  console.log(viewname)
  const [editViewname, setEditViewname] = useState(false)
  const [editedViewname, setEditedViewname] = useState(null)
  const [submittedEdit, setSubmittedEdit] = useState(false)
  const [portfolioChange, setPortfolioChange] = useState(null)
  
  useEffect(() => {
    console.log("ran use effect", allTransactionDetails, display)
    

    allTransactionDetails.transactions.sort((a,b)=> new Date(b.txValue.date) - new Date(a.txValue.date))
    setPortfolioChange((((allTransactionDetails.stats.totalSoldValue - allTransactionDetails.stats.totalBoughtValue)/allTransactionDetails.stats.totalSoldValue)*100));
  }, [submittedEdit]);

  function showOne(dbtransactionId) {
    setIsLoading(true)
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
        setIsLoading(false)
      });
  }

  function deleteView(viewId) {
    instance.delete("/view", { params: { token, viewId } }).then((response) => {
      console.log(response, "response");
      setDisplay("showallviews");
    });
  }
  function handleChange(e){
    if(e.target.name === "viewname") {
      setEditedViewname(e.target.value)
      console.log(editedViewname)
    }   
  }

  function edit(e){
    e.preventDefault()
    instance
    .post("/rename-view", {token, viewId, viewname: editedViewname})
    .then((response)=>{
      console.log(response)
      setSubmittedEdit(true)
      setViewname(editedViewname)
      setEditViewname(false)
    }).catch((error)=>{
      console.log(error)
        setDisplay("errormsg")
    })
    
  }

  return (
    <div id="content-container">
      {isLoading ? <LoadingSpinner/> :
       (
        <>
          <div id="details-container">
            <div id="summary-container">
              <h6 className="details-header">{viewname}</h6>
                <div id="button-container">
                <button onClick={()=> setEditViewname(true)}>Edit Viewname</button>
               
                <button onClick={() => deleteView(viewId)}>Delete View</button>
                </div>
                <div id="edit-container">
                 {editViewname &&
                <form onSubmit={(e)=>edit(e)}>
                <input
                  type="text"
                  name="viewname"
                  defaultValue = {viewname}
                  onChange={(e)=>handleChange(e)}
                /> 
                
                <button type="submit">Edit</button>
                </form>
                }
                </div>
            </div>
            <div id="transaction-container">
              {allTransactionDetails.transactions.map((transaction) => {
                return (
                  <div key={transaction.id} className="transaction">
                    <span className={transaction.transactionType} onClick={() => showOne(transaction.id)}>
                      {transaction.transactionType === "BUY"? `Bought`: `Sold`} {" "}
                      {transaction.qty.toFixed(8)} {transaction.token} on {moment(transaction.txValue.date).format("DD-MM-YY")} | {(((transaction.soldValue-transaction.boughtValue)/transaction.soldValue)*100).toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="graph">
            <div id="summary-container">
              
               {portfolioChange < 0 ? <span className="text-warning portfolio-details">{portfolioChange.toFixed(2)}%</span> : <span className="text-primary portfolio-details">{portfolioChange.toFixed(2)}%</span>}

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
