import React, { useEffect, useState } from "react";
import Submit from "./components/submit.jsx";
import ShowAll from "./components/showall.jsx";
import axios from "axios";

//One ether = 1,000,000,000,000,000,000 wei

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const submitRecord = () => setSubmit(!submit);
  const showRecords = () => setShowAll(!showAll);
  return (
    <div>
      <button onClick={() => submitRecord()}>Submit a record</button>
      <button onClick={() => showRecords()}>Show all records</button>
      <button>Logout</button>
      {submit && <Submit />}
      {showAll && <ShowAll showAll={showAll} />}
    </div>
  );
}
