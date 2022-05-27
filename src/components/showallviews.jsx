import React, { useEffect, useState } from "react";


import ShowOne from "./showone.jsx";
import axios from "axios";

import { instance } from "../connection/my-axios.mjs";


export default function ShowAllViews({ token, transactionDetails, setTransactionDetails, setDisplay, display}) {
  console.log("token", token);
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  const [statDetails, setStatDetails] = useState([]);
  const [allViewDetails, setAllViewDetails] = useState([])
  
  useEffect(() => {
    instance
      .get("/all-views", {
        params: { token },
      })
      .then((response) => {
        console.log(response.data, "ran");
        setAllViewDetails(response.data);
        setDisplay('showallviews')
      });
  }, []);

  function showOne(dbtransactionId) {
    console.log(dbtransactionId, " id");
    instance
      .get("/get-transaction", { params: { token, dbtransactionId } })
      .then((response) => {
        console.log(response.data,'response')
        const { transactions, stats } = response.data;
        const transactionData = { transactions, stats };
        console.log(transactionDetails ,'txn deets')
        setTransactionDetails({ transactions, stats });
        setDisplay("showone");
        console.log(transactionDetails)
      });
  }


  return (
    <div id="content-container">
      {display === "showallviews" && 
        <>
          <div id="details-container">
            
            <div id="views-container">
              <h6>Saved views</h6>
              {/* {allViewDetails.map((view) => {
                return (
                  <div key={view.id} className="view">
                    <span onClick={()=>showOne(view.id)}>
                      {view.viewname} | {view.createdDate} 
                    </span>
                  </div>
                );
              })} */}
            </div>
          </div>
         
        </>
      }
     
    </div>
  );
}
