import React, { useEffect, useState } from "react";
import Graph from "./graph.jsx";
import axios from "axios";

export default function Submit() {
  const [transactionHash, setTransactionHash] = useState();
  const [transactionType, setTransactionType] = useState();

  const [showForm, setShowForm] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});

  const handleInputChange = (event) => {
    if (event.target.name == "transactionHash") {
      setTransactionHash(event.target.value);
    }

    if (event.target.name == "transactionType") {
      setTransactionType(event.target.value);
    }

    console.log(transactionHash, transactionType);
  };

  function record(e) {
    e.preventDefault();

    const data = {
      transactionType: transactionType,
      transactionHash: transactionHash,
    };

    axios.post("/track-transaction", data).then((response) => {
      console.log(response.data);
      const transactionData = {};
      transactionData["data"] = response.data;
      setTransactionDetails({ ...transactionDetails, ...transactionData });
      console.log(transactionDetails);
      setShowForm(false);
      setShowDetails(true);
    });
  }

  return (
    <div id="container">
      {showForm && (
        <div id="form-container">
          <form onSubmit={(e) => record(e)}>
            <label>Transaction Hash</label>
            <input
              type="text"
              name="transactionHash"
              onChange={(event) => handleInputChange(event)}
            />{" "}
            <br />
            <label>Transaction Type</label>
            <select
              name="transactionType"
              defaultValue=""
              onChange={(event) => handleInputChange(event)}
            >
              <option value="" hidden>
                ---Choose One---
              </option>
              <option value="sell">sell</option>
              <option value="buy">buy</option>
              <option value="transferIn">transfer in</option>
              <option value="transferOut">transfer out</option>
            </select>{" "}
            <br />
            <input type="submit" value="submit" />
          </form>
        </div>
      )}
      {showDetails && (
        <>
          <div id="details-container">
            <div id="details-heading">
              <h6>Transaction Details</h6>
              <h6>{transactionDetails.data.transaction[0].hash}</h6>
              <button>Edit</button>
              <button>Delete</button>
            </div>
            <span>
              {transactionDetails.data.transaction[0].txValue.date} |{" "}
              {transactionDetails.data.transaction[0].transactionType} |{" "}
              {transactionDetails.data.transaction[0].qty} |{" "}
              {transactionDetails.data.transaction[0].network} |{" "}
              {transactionDetails.data.transaction[0].txValue.value} |{" "}
              {transactionDetails.data.transaction[0].currentValue.value} |
              {(transactionDetails.data.stats.unrealisedGL * 100).toFixed(2)}%
            </span>
            <div id="graph">
              <Graph
                txValue={transactionDetails.data.transaction[0].txValue.value}
                curValue={
                  transactionDetails.data.transaction[0].currentValue.value
                }
                txDate={transactionDetails.data.transaction[0].txValue.date}
                curDate={
                  transactionDetails.data.transaction[0].currentValue.date
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
