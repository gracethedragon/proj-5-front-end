import React, { useEffect, useState } from "react";
import Submit from "./components/submit.jsx";
import ShowAll from "./components/showall.jsx";
import ShowOne from "./components/showone.jsx";
import ShowAllViews from "./components/showallviews.jsx";
import { Login } from "./components/login.jsx";
import axios from "axios";
import ShowOneView from "./components/showoneview.jsx";

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
  const [display, setDisplay] = useState(null);

  const [viewId, setViewId] = useState(null);

  const submitRecord = () => {
    setDisplay("form");
    setSubmit(true);
    setShowAll(false);
  };
  const showRecords = () => {
    setDisplay("showall");
    setShowAll(true);
    setShowAllViews(false);
    setSubmit(false);
  };

  const showViews = () => {
    setDisplay("showallviews");
    console.log(display, showAllViews, showAll);
    setShowAllViews(true);
    setShowAll(false);
    setSubmit(false);
  };
  const logout = () => {
    setToken(null);
    setUsername(null);
  };
  return (
    <div id="body">
      {!token && <Login setToken={setToken} setUsername={setUsername} />}
      {token && (
        <>
          <div id="button-container">
            <div id="buttonleft">
              <button onClick={() => submitRecord()}>Submit a record</button>
              <button onClick={() => showRecords()}>Show all records</button>
              <button onClick={showViews}>Saved views</button>
            </div>
            <div id="buttonright">
              {username && <span>{username}</span>}
              <button onClick={() => logout()}>Logout</button>
            </div>
          </div>

          {display === "form" && (
            <Submit
              token={token}
              setSubmit={setSubmit}
              setDisplay={setDisplay}
              display={display}
              setTransactionDetails={setTransactionDetails}
              transactionDetails={transactionDetails}
            />
          )}

          {showAll && (
            <ShowAll
              token={token}
              setDisplay={setDisplay}
              display={display}
              setTransactionDetails={setTransactionDetails}
            />
          )}

          {display === "showone" && (
            <ShowOne
              transactionDetails={transactionDetails}
              token={token}
              setDisplay={setDisplay}
              displa={display}
            />
          )}

          {showAllViews && (
            <ShowAllViews
              token={token}
              setDisplay={setDisplay}
              display={display}
              setTransactionDetails={setTransactionDetails}
              setViewId={setViewId}
            />
          )}
          {display === "showoneview" && (
            <ShowOneView
              viewId={viewId}
              transactionDetails={transactionDetails}
              setTransactionDetails={setTransactionDetails}
              token={token}
              setDisplay={setDisplay}
              display={display}
              setShowAllViews={setShowAllViews}
            />
          )}
        </>
      )}
    </div>
  );
}
