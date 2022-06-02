import React, { useEffect, useState } from "react";
import LoadingSpinner from "./spinner.jsx";
import ShowOne from "./showone.jsx";
import ShowOneView from "./showoneview.jsx";

import { instance } from "../connection/my-axios.mjs";

export default function ShowAllViews({
  token,
  transactionDetails,
  setTransactionDetails,
  setDisplay,
  setViewId,
  display,
}) {
  console.log("token", token);
  const [allTransactionDetails, setAllTransactionDetails] = useState([]);
  const [statDetails, setStatDetails] = useState([]);
  const [allViewDetails, setAllViewDetails] = useState([]);

  useEffect(() => {
    console.log("running use effect");
    instance
      .get("/all-views", {
        params: { token },
      })
      .then((response) => {
        console.log(response.data, "ran");
        setAllViewDetails(response.data.views);
        // setDisplay('showallviews')
      });
  }, []);

  function showOne(viewId) {
    console.log(viewId, " id");
    instance
      .get("/get-view", { params: { token, viewId } })
      .then((response) => {
        console.log(response.data, "response");

        const { view, viewId: viewIdReceived } = response.data;
        const { transactions, stats } = view;
        const transactionData = { transactions, stats };
        console.log(transactionData, "txn deets");

        setViewId(viewIdReceived);
        setTransactionDetails({ transactions, stats });
        setDisplay("showoneview");
      });
  }

  return (
    <div id="content-container">
      {allViewDetails !== null && display === "showallviews" && (
        <>
          <div id="details-container">
            <div id="views-container">
              <h6>Saved views</h6>
              {allViewDetails.map((view) => {
                return (
                  <div key={view.id} className="view">
                    <span onClick={() => showOne(view.id)}>
                      {view.viewname} | {view.createdDate}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
