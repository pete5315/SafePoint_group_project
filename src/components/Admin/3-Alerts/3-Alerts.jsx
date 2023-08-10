import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../AdminCSS/Admin.css";
import AlertMap from "./3-AlertMap";
import AlertDetailsDialog from "./3-AlertDetailsDialog";

function Alerts() {
  const dispatch = useDispatch();

  // Reducers
  const currentEvent = useSelector((store) => store.currentEvent);
  const emergencies = useSelector((store) => store.currentEmergencies);
  let user = useSelector((store) => store.user);
  
  // On page load, Gets the alerts of that selected event.
  useEffect(() => {
    dispatch({
      type: "GET_EMERGENCY_LIST",
      payload: { eventID: currentEvent.id },
    });
    dispatch({ type: "GET_EVENT_LIST", payload: { user } });
  }, [dispatch]);

  // function to refresh the page
  function useInterval(callback, delay) {
    useEffect(() => {
      const interval = setInterval(callback, delay);
      return () => clearInterval(interval);
    }, [callback, delay]);
  }

  // every 3 secs the page does a auto refresh to grab any new update info if there is any.
  useInterval(() => {
    dispatch({
      type: "GET_EMERGENCY_LIST",
      payload: { eventID: currentEvent.id },
    });
  }, 3000);

  // local state
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="adminMainText">
        <h1>Emergency Alerts</h1>
        <p>Click on a card to see details of each alert</p>
      </div>
      {emergencies &&
        // mapping the alerts/emergencies for selected event
        emergencies.map((emergency, i) => (
          <AlertMap setOpen={setOpen} emergency={emergency} key={i}/>
        ))}
      <AlertDetailsDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Alerts;
