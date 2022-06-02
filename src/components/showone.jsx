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
          }><i class="fa fa-trash"></i></button>
        </h6>
        
        <h6 className="details">{transactionDetails.transactions[0].hash}</h6>
        
        <br />
         <h6 className="details">
           {moment(transactionDetails.transactions[0].txValue.date).format('MMMM Do YYYY, h:mm a')} |
           {" "}{transactionDetails.transactions[0].transactionType}
           {" "}{transactionDetails.transactions[0].qty}
           {" "}{transactionDetails.transactions[0].token}</h6>

           {/* if buy transaction */}
           {transactionDetails.transactions[0].transactionType === "BUY" &&
           <div>
          <h6 className="details" >Transacted @ 
          {" "}<span className="details-highlight">USD {transactionDetails.transactions[0].txValue.value.toFixed(2)}</span>| 
          {" "}
          Currently @ 
          {" "}<span className="details-highlight">USD {transactionDetails.transactions[0].currentValue.value.toFixed(2)}</span></h6>
          <h6 className="details">Change of <span className="details-highlight">{(transactionDetails.stats.unrealgl * 100).toFixed(2)}% </span></h6>
          </div>
        }
          {/* if sell transaction */}
          {transactionDetails.transactions[0].transactionType === "SELL" &&
           <div>
           <h6 className="details" >Bought @ 
          {" "}<span className="details-highlight">{transactionDetails.transactions[0].currentValue.value.toFixed(2)}</span>| 
          {" "}
          Transacted @ 
          {" "}<span className="details-highlight">USD {transactionDetails.transactions[0].txValue.value.toFixed(2)}</span></h6>
          <h6 className="details">Change of <span className="details-highlight">{(transactionDetails.stats.realgl*100).toFixed(2)}% </span></h6>
           </div>
        }
      </div>
      <div id="graph">
        <IndivGraph
          txValue={transactionDetails.transactions[0].txValue.value}
          curValue={transactionDetails.transactions[0].currentValue.value}
          txDate={transactionDetails.transactions[0].txValue.date}
          curDate={transactionDetails.transactions[0].currentValue.date}
        />
      </div>
       </> )} 
    </div>
   
  )
}
