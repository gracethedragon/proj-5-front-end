import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [transactionHash, setTransactionHash] = useState();
  const [details, setDetails] = useState(false);
  const [detailsData, setDetailsData] = useState();

  function handleInputChange(event) {
    console.log(event.target.value);
    setTransactionHash(event.target.value);
    console.log(transactionHash);
  }

  function search(e) {
    e.preventDefault();
    console.log(transactionHash);
    axios
      .get(`https://api.blockchair.com/ethereum/dashboards/transaction/${transactionHash}?events=true&erc_20=true&erc_721=true&assets_in_usd=true&effects=true&trace_mempool=true`)
      .then((response) => {
        const transactionDetails = response.data.data[transactionHash].transaction;
        console.log(transactionDetails, 'response');
        setDetailsData(transactionDetails);
        setDetails(true);
      });
  }
  useEffect(() => {
    console.log(detailsData, 'details');
  }, [details, detailsData]);
  return (
    <div>
      This is App.jsx
      <form onSubmit={(e) => search(e)}>
        <input type="text" name="transaction" onChange={(event) => handleInputChange(event)} />
        <input type="submit" value="submit" />
      </form>
      {details
      && (
      <>
        <h2>Transaction details</h2>
        <div>

          {Object.keys(detailsData)?.map((key, i) => (
            <p key={i}>
              <span>
                {key}
              </span>
              <span>
                Value:
                {detailsData[key]}
              </span>
            </p>
          ))}
        </div>

      </>
      )}
    </div>
  );
}
