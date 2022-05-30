import React, { useEffect, useState } from "react";
import { IndivGraph } from "./graph.jsx";
import ShowOne from "./showone.jsx";
import { instance } from "../connection/my-axios.mjs";

export default function Submit({
  setSubmit,
  token,
  display,
  setDisplay,
  setTransactionDetails,
  transactionDetails,
}) {
  const [transactionHash, setTransactionHash] = useState();
  const [transactionType, setTransactionType] = useState();

  // const [transactionDetails, setTransactionDetails] = useState({
  //   transactions: [],
  //   stats: {},
  // });

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
      token,
      transactionType: transactionType,
      transactionHash: transactionHash,
    };

    instance.post("/track-transaction", data).then((response) => {
      console.log(response.data);

      const { transactions, stats } = response.data;
      const transactionData = { transactions, stats };

      setTransactionDetails(transactionData);
      setDisplay("showone");
      console.log(transactionDetails);
    });
  }

  return (
    <div id="container">
      {display === "form" && (
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
      {/* {display === "showone" &&
        <ShowOne
          transactionDetails={transactionDetails}
          token={token}
          setDisplay = {setDisplay}
        />
        } */}
    </div>
  );
}
