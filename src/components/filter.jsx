import React, { useEffect, useState } from "react";
import { instance } from "../connection/my-axios.mjs";
import DatePicker from "react-date-picker";

export default function FilterView({
  filter,
  setIsFiltered,
  token,
  setParameters,
  setIsLoading,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  setNetwork,
  network
}) {
  
  
  const [showSaveView, setShowSaveView] = useState(false);
  const [viewSaved, setViewSaved] = useState(false);
  const [viewname, setViewname] = useState("default viewname")


  const [transactionIds, setTransactionIds] = useState([]);

  const handleChange = (event) => {
    if(event.target.name === "filter"){
      setNetwork(event.target.value);
      setShowSaveView(false);
      setViewSaved(false);
      console.log(network);
    }

    if(event.target.name === "viewname") {
      setViewname(event.target.value)
    }
  };

  function submitFilter() {
    setIsLoading(true)
    setIsFiltered(true)
    const parameters = [];
    if (filter === "Date") {
      console.log(startDate, endDate, "date filter");
      setParameters([startDate, endDate]);
      console.log(parameters)
    } else if (filter === "Network") {
      setParameters([network])
      console.log(network, "network filter");
      console.log(parameters)
    }
    // instance
    //   .get("/all-transactions", {
    //     params: { token, filterBy: { column: filter, parameters } },
    //   })
    //   .then((response) => {
        
    //     console.log("response", response);
    //     if(response.data.transactions.length === 0){
    //       console.log('no results')
    //       setNoResults(true)
    //       setTransactionIds("")
          
    //     } else {
    //       setNoResults(false)
    //       setIsFiltered(true);
    //       setAllTransactionDetails(response.data.transactions);
    //       setTransactionIds(
    //         response.data.transactions.map((transaction) => transaction.id)
    //       );
    //       console.log(transactionIds, "saved txn details");
    //       setShowSaveView(true);
    //     }
    //   });
    
  }

  function saveView() {
    console.log("view saved");
    console.log(transactionIds, "saved txn details");
    console.log(viewname);
    instance.post("/new-view", { token, transactionIds, viewname }).then((response) => {
      setShowSaveView(false);
      setViewSaved("View Saved!");
      console.log(response);
    }).catch((error)=>{
      console.log(error)
        setDisplay("errormsg")
    });
  }

  return (
    <div id="filter2-container">
      {filter === "Date" && (
        <div id="datefilter">
          
          <DatePicker onChange={setStartDate} value={startDate} />{"  "}
          to before{"  "}
          <DatePicker
            minDate={startDate}
            onChange={setEndDate}
            value={endDate}
          />
          
          {"  "}
          <button onClick={submitFilter}>Go</button>
        </div>
      )}
      {filter === "Network" && (
        <div id="networkfilter">
          <select
            name="filter"
            onChange={(event)=>handleChange(event)}
            defaultValue={network.length !== 0 ? network:""}
            required
          >
            <option value="" disabled>
              --- Choose Network ---
            </option>
            <option name="ETH" value="ETH">
              ETH
            </option>
            <option name="BTC" value="BTC">
              BTC
            </option>
          </select> <button onClick={submitFilter}>Go</button><br/>
          
        </div>
      )}
      
      {/* {showSaveView === true && <button onClick={saveView}>Save View</button>}
      {viewSaved === "View Saved!" && <span>{viewSaved}</span>} */}
    </div>
  );
}
