import React, { useEffect, useState } from "react";
import { IndivGraph } from "./graph.jsx";
import moment from "moment";
import { instance } from "../connection/my-axios.mjs";

export default function ShowOne({
  transactionDetails,
  token,
  setDisplay,
  display,
}) {
  function deleteTransaction(dbtransactionId) {
    console.log(dbtransactionId, "id");

    instance
      .delete("/transaction", { params: { token, dbtransactionId } })
      .then((response) => {
        setDisplay("form");
        console.log(response);
      });
  }
  return (
    <div id="single-details-container">
      <div id="details" >
        <h6 className="details-header">Transaction Details
          <button class="btn shadow-none"
          onClick={() =>
            deleteTransaction(transactionDetails.transactions[0].id)
          }><i class="fa fa-trash"></i></button>
        </h6>
        
        <h6 className="details">{transactionDetails.transactions[0].hash}</h6>
        
        <br />
         <h6 className="details">
           {moment(transactionDetails.transactions[0].txValue.date).format('MMMM Do YYYY, h:mm a')} |
           {" "}{transactionDetails.transactions[0].transactionType}
           {" "}{transactionDetails.transactions[0].qty}
           {" "}{transactionDetails.transactions[0].network}</h6>

           {/* if buy transaction */}
           <h6> if buy</h6>
          <h6 className="details" >Transacted @ 
          {" "}<span className="details-highlight">USD {transactionDetails.transactions[0].txValue.value.toFixed(2)}</span>| 
          {" "}
          Currently @ 
          {" "}<span className="details-highlight">USD {transactionDetails.transactions[0].currentValue.value.toFixed(2)}</span></h6>
          <h6 className="details">Change of <span className="details-highlight">{(transactionDetails.stats.unrealgl * 100).toFixed(2)}% </span></h6>
          {/* if sell transaction */}
          <h6> if sell</h6>
           <h6 className="details" >Bought @ 
          {" "}<span className="details-highlight">USD qty x unit cost price</span>| 
          {" "}
          Transacted @ 
          {" "}<span className="details-highlight">USD {transactionDetails.transactions[0].currentValue.value.toFixed(2)}</span></h6>
          <h6 className="details">Change of <span className="details-highlight">{(transactionDetails.stats.unrealgl*100).toFixed(2)}% </span></h6>
      </div>
      <div id="graph">
        <IndivGraph
          txValue={transactionDetails.transactions[0].txValue.value}
          curValue={transactionDetails.transactions[0].currentValue.value}
          txDate={transactionDetails.transactions[0].txValue.date}
          curDate={transactionDetails.transactions[0].currentValue.date}
        />
      </div>
    </div>
  );
}
