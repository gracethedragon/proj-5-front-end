import React, { useEffect, useState } from "react";
import Submit from "./components/submit.jsx";
import ShowAll from "./components/showall.jsx";
import ShowOne from "./components/showone.jsx";
import ShowAllViews from "./components/showallviews.jsx";
import { Login } from "./components/login.jsx";
import LoadingSpinner from "./components/spinner.jsx";

import axios from "axios";
import ShowOneView from "./components/showoneview.jsx";

//One ether = 1,000,000,000,000,000,000 wei

export default function App() {
  // loader
  const [isLoading, setIsLoading] = useState(false);

  // user authentication purposes
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // show one transaction
  const [transactionDetails, setTransactionDetails] = useState({
    transactions: [],
    stats: {},
  });

  // set all transactions
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  
  // set parameters
  const [parameters ,setParameters] = useState(null)


  // set what component to render
  const [display, setDisplay] = useState(null);

  // set view
  const [viewId, setViewId] = useState(null);
  const [viewname, setViewname] = useState(null)

  const submitRecord = () => {
    setIsLoading(false)
    setDisplay("form");
  };
  const showRecords = () => {    
    setIsLoading(true)
    setParameters(null)
    console.log(isLoading, display, parameters)
    setDisplay("showall");
    // setShowAllViews(false);
    
  };

  const showViews = () => {
    setDisplay("showallviews");
    console.log(display);
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

          {display === "form" && 
            <Submit
              token={token}
              setDisplay={setDisplay}
              display={display}
              setTransactionDetails={setTransactionDetails}
              transactionDetails={transactionDetails}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }

          {display==="showall" &&
            <ShowAll
              token={token}
              setDisplay={setDisplay}
              display={display}
              setTransactionDetails={setTransactionDetails}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              parameters={parameters}
              setParameters={setParameters}
              setAllTransactionDetails={setAllTransactionDetails}
              allTransactionDetails={allTransactionDetails}
            /> 
          }

          {display === "showone" &&
            <ShowOne
              transactionDetails={transactionDetails}
              token={token}
              setDisplay={setDisplay}
              display={display}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              
            />
          }

          {display === "showallviews" && (
            <ShowAllViews
              token={token}
              setDisplay={setDisplay}
              display={display}
              setAllTransactionDetails={setAllTransactionDetails}
              setViewId={setViewId}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              setViewname={setViewname}
              
            />
          )}

          {display === "showoneview" && (
            <ShowOneView
              viewId={viewId}  
              token={token}
              allTransactionDetails={allTransactionDetails}
              // transactionDetails={transactionDetails}
              setTransactionDetails={setTransactionDetails}
              setDisplay={setDisplay}
              display={display}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              viewname={viewname}
              setViewname={setViewname}
            />
          )}
        </>
      )}
    
    </div>
          
  )
}
