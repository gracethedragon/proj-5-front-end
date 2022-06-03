import React, { useEffect, useState } from "react";
import { IndivGraph } from "./graph.jsx";
import moment from "moment";
import { instance } from "../connection/my-axios.mjs";
import LoadingSpinner from "./spinner.jsx";

export default function ShowOne({
  transactionDetails,
  token,
  setDisplay,
  display,
  isLoading,
  setIsLoading
}) {

  
  function deleteTransaction(dbtransactionId) {
    console.log(dbtransactionId, "id");
    setIsLoading(true)

    instance
      .delete("/transaction", { params: { token, dbtransactionId } })
      .then((response) => {
        setDisplay("showall");
        // setIsLoading(false)
        console.log(response);
      });
  }
  return (
    
    <div id="single-details-container">
    {isLoading ? <LoadingSpinner/> :(  
      <><div id="details" >
        <h6 className="details-header">Transaction Details
          <button className="btn shadow-none"
          onClick={() =>
            deleteTransaction(transactionDetails.transactions[0].id)
          }><i className="fa fa-trash"></i></button>
        </h6>
        
        <h6 className="details">
          {transactionDetails.transactions[0].hash}</h6>
        <h6 className="details-highlight">
          {transactionDetails.transactions[0].qty} {transactionDetails.transactions[0].token}</h6>
           <div>
          <h6 className="details" >
            Bought @ <span className="details-highlight">USD {transactionDetails.transactions[0].boughtValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> on {moment(transactionDetails.transactions[0].boughtDate).format('MMMM Do YYYY')} </h6>

          <h6 className="details" >
          {transactionDetails.transactions[0].transactionType === "BUY" ?`Currently @`  : `Sold @`}
          {" "}<span className="details-highlight">USD {transactionDetails.transactions[0].soldValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> on {moment(transactionDetails.transactions[0].soldDate).format('MMMM Do YYYY')}</h6>

          <h6 className="details">Change of <span className="details-highlight">{(((transactionDetails.stats.totalSoldValue - transactionDetails.stats.totalBoughtValue)/ transactionDetails.stats.totalSoldValue)* 100).toFixed(2)}% </span></h6>
          </div>
        
      </div>
      <div id="graph">
        <IndivGraph
          boughtValue={transactionDetails.transactions[0].boughtValue}
          soldValue={transactionDetails.transactions[0].soldValue}
          boughtDate={transactionDetails.transactions[0].boughtDate}
          soldDate={transactionDetails.transactions[0].soldDate}
          transactionType={transactionDetails.transactions[0].transactionType}
        />
      </div>
       </> )} 
    </div>
   
  )
}
