import React, { useEffect, useState } from "react";
import LoadingSpinner from "./spinner.jsx";
import ShowOne from "./showone.jsx";
import ShowOneView from "./showoneview.jsx";
import moment from "moment";

import { instance } from "../connection/my-axios.mjs";

export default function ShowAllViews({
  token,
  setAllTransactionDetails,
  setDisplay,
  setViewId,
  display,
  setIsLoading,
  isLoading,
  setViewname
}) {
  console.log("token", token);
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
        setAllViewDetails(response.data.views)
        setIsLoading(false);
      });
  }, []);

  function showOne(viewId) {
    setIsLoading(true)
    console.log(viewId, " id");
    instance
      .get("/get-view", { params: { token, viewId } })
      .then((response) => {
        console.log(response.data, "response");
        const { view, viewId: viewIdReceived } = response.data;
        const { transactions, stats } = view;
        setViewId(viewIdReceived);
        setViewname(response.data.viewName)
        setAllTransactionDetails({ transactions, stats });
        setDisplay("showoneview");
        setIsLoading(false)
      });
  }

  return (
    <div id="content-container">
      {isLoading ? <LoadingSpinner/> :
       (
      <>{allViewDetails !== null && display === "showallviews" && (
          <div id="details-container">
            <div id="views-container">
              <h6 className="details-header">Saved views</h6>
              {allViewDetails.map((view) => {
                return (
                  <div key={view.id} className="view">
                    <span className="view-transaction"onClick={() => showOne(view.id)}>
                      {view.viewname} | {moment(view.createdDate).format('MMMM Do YYYY')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}</>
      )}
    </div>
  );
}
