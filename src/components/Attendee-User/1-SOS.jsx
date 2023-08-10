import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import "./AUcss/AU.css";
import SOSAlert from "./SOS-Alert";
import NoEvents from "./SOSNoEvents";
import SOSMap from "./SOSMap";

function SOS() {
  const dispatch = useDispatch();

  // bringing in the stores that we need to use in this component
  let user = useSelector((store) => store.user);
  let events = useSelector((store) => store.eventList);

  // setting a local state to determine if an event is or isn't selected
  const [eventNotSelected, setEventNotSelected] = useState(true);

  // when the page loads this will set the event list and get rid of any current emergency
  useEffect(() => {
    dispatch({ type: "GET_EVENT_LIST", payload: { user } });
    dispatch({ type: "UNSET_EMERGENCY" });
  }, []);

  // this function sets the current event/emergency
  const handleChange = (event) => {
    dispatch({ type: "SET_CURRENT_EVENT", payload: event.target.value });
    setEventNotSelected(false); // When the event is selected we change the useState which when rendering will then have SOS show
  };

  // if there are events present this is what will render
  if (events.length > 0) {
    return (
      <div className="center">
        <Typography variant="h7" gutterBottom>
          You must select an event to send an alert
        </Typography>
        <SOSMap handleChange={handleChange} />
        {eventNotSelected || (
          <div>
            <SOSAlert />
          </div>
        )}
      </div>
    );
    // if there are no events this is what will render
  } else if (events.length === 0) {
    return (
      <div>
        <NoEvents />
      </div>
    );
  }
}

export default SOS;
