import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowAll({ showRecords }) {
  console.log(showRecords !== "undefined");
  const [allTransactions, setAllTransactions] = useState();
  const [showTransactions, setShowTransactions] = useState(false);

  axios.get(`/retrieve-tracked-transactions`).then((res) => {
    const tradedTransactions = {
      data: [
        {
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
        },
        {
          transaction: {
            id: 2,
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
        },
      ],
    };

    const response = {
      tradedTransactions: tradedTransactions,
      // coinsData,
      summary: {
        outlayUSD: 1045.68 * 2,
        tilDateUSD: 1018.71 * 2,
      },
    };
    console.log(response);
    setAllTransactions(response);
    setShowTransactions(true);
    console.log(showTransactions);
  });

  // useEffect(() => {
  //   console.log(allTransactions);
  // }, [showTransactions]);
  return (
    <div>
      <h6>Portfolio to date</h6>
      {showTransactions && (
        <div>
          {/* <h6>total outlay: {allTransactions.summary.outlayUSD}</h6>
          <h6>total inlay: {allTransactions.summary?.tilDateUSD}</h6> */}
        </div>
      )}
    </div>
  );
}
