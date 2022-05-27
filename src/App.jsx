import React, { useEffect, useState } from "react";
import Submit from "./components/submit.jsx";
import ShowAll from "./components/showall.jsx";
import { Login } from "./components/login.jsx";
import axios from "axios";

//One ether = 1,000,000,000,000,000,000 wei

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [token, setToken] = useState(null);

  const submitRecord = () => {
    console.log(submit);
    console.log(showAll);
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
      {!token && (
        <Login
          setAuthorized={setAuthorized}
          setToken={setToken}
          setUsername={setUsername}
        />
      )}
      {token && (
        <>
          <div id="button-container">
            <div id="buttonleft">
              <button onClick={() => submitRecord()}>Submit a record</button>
              <button onClick={() => showRecords()}>Show all records</button>
              <button onClick={() => showRecords()}>Saved views</button>
            </div>
            <div id="buttonright">
              {username && <span>{username}</span>}
              <button onClick={() => logout()}>Logout</button>
            </div>
          </div>

          {submit && (
            <Submit token={token} setSubmit={setSubmit} submit={submit} />
          )}
          {showAll && <ShowAll token={token} />}
        </>
      )}
    </div>
  );
}
