import React, { useEffect, useState } from "react";
import { instance } from "../connection/my-axios.mjs";
import DatePicker from "react-date-picker";

export default function FilterView({
  filter,
  setIsFiltered,
  token,
  allTransactionDetails,
  setNoResults
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [network, setNetwork] = useState("");
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
    const parameters = [];
    if (filter === "Date") {
      console.log(startDate, endDate, "date filter");
      parameters.push(startDate, endDate);
    } else if (filter === "Network") {
      parameters.push(network);
      console.log(network, "network filter");
    }
    instance
      .get("/all-transactions", {
        params: { token, filterBy: { column: filter, parameters } },
      })
      .then((response) => {
        
        console.log("response", response);
        if(response.data.transactions.length === 0){
          console.log('no results')
          setNoResults(true)
          setTransactionIds("")
          
        } else {
          setNoResults(false)
          setIsFiltered(true);
          setTransactionIds(
            response.data.transactions.map((transaction) => transaction.id)
          );
          console.log(transactionIds, "saved txn details");
          setShowSaveView(true);
        }
      });
    
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

  useEffect(() => {
    setViewSaved(false);
  }, [filter, startDate, endDate, network]);

  return (
    <div id="filter2-container">
      {filter === "Date" && (
        <div id="datefilter">
          from:
          <DatePicker onChange={setStartDate} value={startDate} />
          to:
          <DatePicker
            minDate={startDate}
            onChange={setEndDate}
            value={endDate}
          />
          <button onClick={submitFilter}>Submit</button>
        </div>
      )}
      {filter === "Network" && (
        <div id="networkfilter">
          <select
            name="filter"
            onChange={(event)=>handleChange(event)}
            defaultValue={""}
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
          </select> <br/>
          <input
            type="text"
            name="viewname"
            placeholder = "viewname"
            onChange={(event)=>handleChange(event)} />
          <button onClick={submitFilter}>Submit</button>
        </div>
      )}
      
      {showSaveView === true && <button onClick={saveView}>Save View</button>}
      {viewSaved === "View Saved!" && <span>{viewSaved}</span>}
    </div>
  );
}
