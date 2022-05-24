import React, { useEffect, useState } from "react";
import Submit from "./components/submit.jsx";
import ShowAll from "./components/showall.jsx";
import { Login } from "./components/login.jsx";
import axios from "axios";

//One ether = 1,000,000,000,000,000,000 wei

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const submitRecord = () => {
    setSubmit(true);
    setShowAll(false);
  };
  const showRecords = () => {
    setShowAll(true);
    setSubmit(false);
  };
  const logout = () => {
    setAuthorized(false);
  };
  return (
    <div>
      {!authorized && <Login setAuthorized={setAuthorized} />}
      {authorized && (
        <div>
          <button onClick={() => submitRecord()}>Submit a record</button>
          <button onClick={() => showRecords()}>Show all records</button>
          <button onClick={() => logout()}>Logout</button>

          {submit && <Submit />}
          {showAll && <ShowAll />}
        </div>
      )}
    </div>
  );
}
