import React, { useEffect, useState } from "react";
import { OverallGraph } from "./graph.jsx";
import LoadingSpinner from "./spinner.jsx";
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
  setIsLoading
}) {

  const [editViewname, setEditViewname] = useState(false)
  const [editedViewname, setEditedViewname] = useState(null)
  const [submittedEdit, setSubmittedEdit] = useState(false)
  
  useEffect(() => {
    console.log("ran use effect", allTransactionDetails, display)
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
    .post("/edit-viewname", {token, viewId, viewname: editedViewname})
    .then((response)=>{
      console.log(response)
      submittedEdit(true)
    })
    
  }

  return (
    <div id="content-container">
      {isLoading ? <LoadingSpinner/> :
       (
        <>
          <div id="details-container">
            <div id="summary-container">
              <h6 className="details-header">View to date</h6>
              
                <button onClick={()=> setEditViewname(true)}>Edit Viewname</button>
                {editViewname &&
                <form onSubmit={(e)=>edit(e)}>
                <input
                  type="text"
                  name="viewname"
                  defaultValue = {viewId.viewname}
                  onChange={(e)=>handleChange(e)}
                />
                <button type="submit">Edit</button>
                </form>
                }
                <button onClick={() => deleteView(viewId)}>Delete View</button>
              
              <div>
                Outlay TD: {allTransactionDetails.stats.outlay} | Unrealised Rev:{" "}
                {allTransactionDetails.stats.unrealrev} | Unrealised G/L:{" "}
                {(allTransactionDetails.stats.unrealgl*100).toFixed(2)}%
              </div>
              <div>
                Sale Oulay: {allTransactionDetails.stats.saleoutlay} | Actual Rev:{" "}
                {allTransactionDetails.stats.actualrev} | Actual G/L:{" "}
                {(allTransactionDetails.stats.actualgl*100).toFixed(2)}%
              </div>
            </div>

            <div id="transaction-container">
              {allTransactionDetails.transactions.map((transaction) => {
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
              outlayTD={allTransactionDetails.stats.outlay}
              unrealisedRev={allTransactionDetails.stats.unrealrev}
            />
          </div>
        </>
       )}
    </div>
  );
}
