import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowAll({ showAll }) {
  const [allTransactions, setAllTransactions] = useState();
  const [showTransactions, setShowTransactions] = useState(false);

  const sendGetReq = async () => {
    console.log("true");
    try {
      await axios.get("/retrieve-tracked-transactions").then((res) => {
        console.log(res.data.tradedTransactions);
        setAllTransactions(res.data.tradedTransactions);
        setShowTransactions(true);
        console.log(allTransactions);
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  if (showAll === true) {
    sendGetReq();
  } else {
    setShowTransactions(false);
  }

  // useEffect(() => {
  //   console.log(allTransactions.data);
  // }, showTransactions);
  return (
    <div>
      <h6>Portfolio to date</h6>
      {showTransactions && (
        <div>
          {allTransactions.map((row) => {
            return (
              <div>
                <h6>
                  Transaction Value USD:{" "}
                  {row.transaction.transactionStatistics.transactionValueUSD}
                </h6>
                <h6>
                  Current Value USD:{" "}
                  {row.transaction.transactionStatistics.CurrentValueUSD}
                </h6>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
