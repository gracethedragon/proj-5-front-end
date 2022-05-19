import React, { useEffect, useState } from 'react';
import axios from 'axios';

//One ether = 1,000,000,000,000,000,000 wei

const wei = 1000000000000000000

export default function App() {

  const [transactionHash, setTransactionHash] = useState();
  const [platform, setPlatform] = useState();
  const [type, setType] = useState();
  
  const [details, setDetails] = useState(false);
  const [detailsData, setDetailsData] = useState();
  const [marketDetails, setMarketDetails] = useState()


  const handleInputChange = (event) => {

    if (event.target.name == 'transaction') {
      setTransactionHash(event.target.value)
    } 

    if (event.target.name == 'platformfee') {
      setPlatform(event.target.value)
    } 

    if (event.target.name == 'type') {
      setType(event.target.value)
    } 

    console.log(transactionHash, platform, type)
  }

  function search(e) {
    e.preventDefault();
    console.log(transactionHash);
    axios
      .get(`https://api.blockchair.com/ethereum/dashboards/transaction/${transactionHash}?events=true&erc_20=true&erc_721=true&assets_in_usd=true&effects=true&trace_mempool=true`)
      .then((response) => {
        console.log(response.data)
        const transactionDetails = response.data.data[transactionHash].transaction;
        const marketDetails = {
          marketprice: response.data.context.market_price_usd,
          updated: response.data.context.cache.until,
        }
        
        console.log(transactionDetails, 'response');
        setDetailsData([transactionDetails, marketDetails]);
        setDetails(true);
      });
  }



  useEffect(() => {
    console.log(detailsData, 'details');
    
  }, [details, detailsData]);
  return (
    <div>
      
      <form onSubmit={(e) => search(e)}>
        <label>Transaction Hash</label>
        <input type="text" name="transaction" onChange={(event) => handleInputChange(event)} /> <br/>
        <label>Platform fee</label>
        <input type="number" name="platformfee" onChange={(event) => handleInputChange(event)} /> <br/>
        <label>Transaction Type</label>
        <select name="type" defaultValue='' onChange={(event) => handleInputChange(event)} >
          <option value='' hidden>---Choose One---</option>
          <option value="sell">sell</option>
          <option value="buy">buy</option>
          <option value="transfer">transfer</option>
        </select> <br/>
        
        <input type="submit" value="submit" />
      </form>
      {details
      && (
      <>
        <h2>Transaction details</h2>
        <h6>type of transaction - {type}</h6>
        {detailsData[0].transferred && 
        <h6>transfer is true</h6>}
        <h6>platform fee {platform}%</h6>
        <h6>transaction {transactionHash}%</h6>
        <div>
        <h6>time (UTC) {detailsData[0].time}</h6>
        <h6>gas qty {detailsData[0].fee/wei} ETH</h6>
        <h6>gas fee (USD) {detailsData[0].fee_usd}</h6>
        <h6>qty {detailsData[0].internal_value/wei} ETH</h6>
        <h6>value (USD) {detailsData[0].value_usd}</h6>
        {/* <h6>current market price (USD) {detailsData[1].marketprice}  as at {detailsData[1].updated}</h6> */}
        <h2>Current details</h2>
        <h6>as at {detailsData[1].updated}</h6>
        <h6>current value (USD) {detailsData[1].marketprice * detailsData[0].internal_value/wei}  </h6>
        <h6>portfolio change {(((detailsData[1].marketprice * detailsData[0].internal_value/wei)/(detailsData[0].value_usd) -1) * 100).toFixed(2)} %  </h6>
        <h6>portfolio change (USD) {((detailsData[1].marketprice * detailsData[0].internal_value/wei)-(detailsData[0].value_usd)).toFixed(2)} </h6>

          {/* {Object.keys(detailsData)?.map((key, i) => (
            <p key={i}>
              <span>
                {key}
              </span>
              <span>
                Value:
                {detailsData[key]}
              </span>
            </p>
          ))} */}
        </div>

      </>
      )}
    </div>
  );
}
