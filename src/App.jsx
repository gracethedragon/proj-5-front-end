import React, { useEffect, useState } from "react";
import Submit from "./components/submit.jsx";
import ShowAll from "./components/showall.jsx";
import ShowOne from "./components/showone.jsx";
import ShowAllViews from "./components/showallviews.jsx";
import { Login } from "./components/login.jsx";
import axios from "axios";

//One ether = 1,000,000,000,000,000,000 wei

export default function App() {
  // user authentication purposes
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // submit a transaction
  const [submit, setSubmit] = useState(false);

  // show one transaction 
  const [transactionDetails, setTransactionDetails] = useState({
    transactions: [],
    stats: {},
  });
  
  // show all transactions
  const [showAll, setShowAll] = useState(false);

  // show all views
  const [showAllViews, setShowAllViews] = useState(false);
  
  // set what component to render
  const [display, setDisplay] = useState(null)


  const submitRecord = () => {
    setDisplay("form")
    setSubmit(true);
    setShowAll(false);
  };
  const showRecords = () => {
    setShowAll(true);
    setSubmit(false);
  };

  const showViews = () => {
    setShowAllViews(true);
    setSubmit(false);
  };
  const logout = () => {
    setToken(null);
    setUsername(null)
  };
  return (
    <div>
      {!token && (
        <Login
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
              <button onClick={() => showViews()}>Saved views</button>
            </div>
            <div id="buttonright">
              {username && <span>{username}</span>}
              <button onClick={() => logout()}>Logout</button>
            </div>
          </div>

          {display === "form" && (
            <Submit 
            token={token} setSubmit={setSubmit} setDisplay={setDisplay} display={display} setTransactionDetails={setTransactionDetails}transactionDetails={transactionDetails} 
            />
          )}
          {display === "showone" &&
            <ShowOne
            transactionDetails={transactionDetails}
            token={token}
            setDisplay = {setDisplay}
            />
          }
          {showAll && 
            <ShowAll token={token} setDisplay={setDisplay} display={display} setTransactionDetails={setTransactionDetails} />}

          {showAllViews && 
            <ShowAllViews token={token} setDisplay={setDisplay} display={display} setTransactionDetails={setTransactionDetails} />}
        </>
      )}
    </div>
  );
}
