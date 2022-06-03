import React, { useEffect, useState } from "react";
import { IndivGraph } from "./graph.jsx";
import LoadingSpinner from "./spinner.jsx";
import { instance } from "../connection/my-axios.mjs";
import DatePicker from "react-date-picker";

import "react-datepicker/dist/react-datepicker.css";


export default function Submit({
  token,
  display,
  setDisplay,
  setTransactionDetails,
  transactionDetails,
  isLoading,
  setIsLoading
}) {
  const [transactionHash, setTransactionHash] = useState();
  const [transactionType, setTransactionType] = useState();
  const [cost, setCost] = useState(null)
  const [boughtDate, setBoughtDate] = useState(new Date())

  const handleInputChange = (event) => {
    if (event.target.name == "transactionHash") {
      setTransactionHash(event.target.value);
    }
    if (event.target.name == "transactionType") {
      setTransactionType(event.target.value);
      if(event.target.value === "SELL") {
        setCost(true)
      } else {
        setCost(null)
      }
    }

    if(event.target.name === "cost") {
      setCost(event.target.value)
    }
    console.log(transactionHash, transactionType, cost);
  };

  function record(e) {
    e.preventDefault();
    setIsLoading(true)

    const data = {
      token,
      transactionType: transactionType,
      transactionHash: transactionHash,
      boughtDate
    };
    console.log(boughtDate)

    instance.post("/track-transaction", data).then((response) => {
      
        console.log(response.data);  
        const { transactions, stats } = response.data;
        const transactionData = { transactions, stats };
        setTransactionDetails(transactionData);
        
        setDisplay("showone");
        console.log(transactionDetails);
        setIsLoading(false)  
    }).catch((error)=>{
      console.log(error)
        setDisplay("errormsg")
    })
  }

  return (
    <div id="container">
      {isLoading? <LoadingSpinner/> :(
        <div id="form-container">
          <form onSubmit={(e) => record(e)}>
            <label>Transaction Hash</label><br/>
            <input
              type="text"
              name="transactionHash"
              onChange={(event) => handleInputChange(event)}
              required
            />{" "}
            <br />
            <label>Transaction Type</label> <br/>
            <select
              name="transactionType"
              defaultValue=""
              onChange={(event) => handleInputChange(event)}
              required
            >
              <option value="" hidden>
                ---Choose One---
              </option>
              <option value="SELL">Sell</option>
              <option value="BUY">Buy</option>
            </select>{" "}
            <br />
            {cost &&
            <div>
            <label>Date Bought</label> <br/>
            <DatePicker maxDate={new Date ()} value={boughtDate} onChange={setBoughtDate} />
            <br/>
            </div>
            }
            <input type="submit" value="submit" className="button" />
          </form>
        </div>
      )}
    </div>
  );
}
