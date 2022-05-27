import React, { useEffect, useState } from "react";


import ShowOne from "./showone.jsx";
import axios from "axios";

import { instance } from "../connection/my-axios.mjs";
import ShowOneView from "./showoneview.jsx";


export default function ShowAllViews({ token, transactionDetails, setTransactionDetails, setDisplay, display}) {
  console.log("token", token);
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  const [statDetails, setStatDetails] = useState([]);
  const [allViewDetails, setAllViewDetails] = useState([])
  
  useEffect(() => {
    console.log('running use effect')
    axios
      .get("/all-views", {
        params: { token },
      })
      .then((response) => {
        console.log(response.data, "ran");
        setAllViewDetails(response.data.views);
        // setDisplay('showallviews')
      });
  }, []);

  function showOne(viewId) {
    console.log(viewId, " id");
    axios
      .get("/get-view", { params: { token, viewId } })
      .then((response) => {
        console.log(response.data,'response')
        const { transactions, stats } = response.data;
        const transactionData = { transactions, stats };
        console.log(transactionData ,'txn deets')
        setTransactionDetails({ transactions, stats });
        setDisplay("showoneview");
        
      });
  }


  return (
    <div id="content-container">
      {(allViewDetails !== null) && (display ==="showallviews") && 
        <>
          <div id="details-container">
            
            <div id="views-container">
              <h6>Saved views</h6>
              {allViewDetails.map((view) => {
                return (
                  <div key={view.id} className="view">
                    <span onClick={()=>showOne(view.id)}>
                      {view.viewname} | {view.createdDate} 
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
         
        </>
      }
     
    </div>
    
  );
}
