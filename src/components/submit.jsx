import React, { useEffect, useState } from "react";
import { IndivGraph } from "./graph.jsx";
import ShowOne from "./showone.jsx";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

export default function Submit({ setSubmit }) {
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

    instance.post("/track-transaction", data).then((response) => {
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
              <option value="SELL">sell</option>
              <option value="BUY">buy</option>
              <option value="TRANSFER-IN">transfer in</option>
              <option value="TRANSFER-OUT">transfer out</option>
            </select>{" "}
            <br />
            <input type="submit" value="submit" />
          </form>
        </div>
      )}
      {showDetails && (
        <ShowOne
          transactionDetails={transactionDetails}
          setSubmit={setSubmit}
        />
      )}
    </div>
  );
}
