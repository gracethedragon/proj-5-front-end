import React, { useEffect, useState } from "react";

import DatePicker from "react-date-picker";

import axios from "axios";

export default function FilterView({ filter }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [network, setNetwork] = useState("");
  const [showSaveView, setShowSaveView] = useState(false);
  const [viewSaved, setViewSaved] = useState(false);

  const handleChange = (event) => {
    setNetwork(event.target.value);
    setShowSaveView(false);
    setViewSaved(false);
    console.log(network);
  };

  function submitFilter() {
    if (filter === "date") {
      console.log(startDate, endDate, "date filter");
    } else if (filter === "network") {
      console.log(network, "network filter");
    }

    // axios
    // .get("/all-transactions")
    setShowSaveView(true);
  }
  function saveView() {
    console.log("view saved");
    setShowSaveView(false);
    setViewSaved("View Saved!");
  }

  useEffect(() => {
    setViewSaved(false);
  }, [filter, startDate, endDate, network]);

  return (
    <div>
      {filter === "date" && (
        <div>
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
      {filter === "network" && (
        <div>
          <select
            name="filter"
            onChange={handleChange}
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
          </select>
          <button onClick={submitFilter}>Submit</button>
        </div>
      )}
      {showSaveView === true && <button onClick={saveView}>Save View</button>}
      {viewSaved === "View Saved!" && <span>{viewSaved}</span>}
    </div>
  );
}
