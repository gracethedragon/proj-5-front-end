import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Submit() {
  const [transactionHash, setTransactionHash] = useState();
  const [transactionType, setTransactionType] = useState();

  const [details, setDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState();

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
    console.log(transactionHash);

    const data = {
      transactionType: transactionType,
      transactionHash: transactionHash,
    };

    axios
      .post(`https://ocalhost:3004/track-transaction`, data)
      .then((response) => console.log(response));
    // axios.get(`https://localhost:3002/${transactionHash}`).then((response) => {
    //   console.log(response.data);

    const tradedTransactions = {
      transaction: {
        id: 1,
        hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
        qty: 0.5,
        network: "ETH",
        sendingAddress: "0x248fb95fc8e064faeb5c8cbeab59d06558ceec80",
        retrievingAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        historicalPrices: 1045.68 / 0.5,
      },
      transactionStatistics: {
        transactionValueUSD: { value: 1045.68 },
        CurrentValueUSD: { value: 1018.71 }, //2037.42*0.5
      },
    };

    const response = {
      tradedTransactions: tradedTransactions,
      // coinsData,
      summary: {
        outlayUSD: 1045.68,
        tilDateUSD: 1018.71,
      },
    };

    setDetails(true);
    setTransactionDetails(response);
    console.log(transactionDetails);
    // });
  }

  useEffect(() => {
    console.log(transactionDetails, "details");
  }, [details, transactionDetails]);
  return (
    <div>
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
      {details && (
        <>
          <h2>Transaction details</h2>
          <h6>type of transaction - </h6>
          <div>
            <h6>Transaction Details</h6>
            {Object.keys(transactionDetails.tradedTransactions.transaction).map(
              (key) => {
                return (
                  <h6 key={key}>
                    {key}:{" "}
                    {transactionDetails.tradedTransactions.transaction[key]}
                  </h6>
                );
              }
            )}
          </div>
          <div>
            <h6>Summary</h6>
            {Object.keys(transactionDetails.summary).map((key) => {
              return (
                <h6 key={key}>
                  {key}: {transactionDetails.summary[key]}
                </h6>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
