import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EventListItem from "./EventListItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function EventList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const eventList = useSelector((store) => store.eventList);

  // grab the event list on page load
  useEffect(() => {
    getEventList();
    // dispatch({ type: "UNSET_CURRENT_EVENT" });
    dispatch({ type: "UNSET_CREATE_EDIT" });
  }, []);
  // get the event from the database for this particular user
  function getEventList() {
    dispatch({
      type: "GET_EVENT_LIST",
      payload: { user },
    });
  }

  // When the create event button is clicked the admin user is directed to the /CreateEvent Page and also creates an event on the server side.
  const createEvent = () => {
    history.push("/CreateEvent");
    dispatch({
      type: "POST_EVENT",
      payload: {
        id: user.id,
      },
    });
    dispatch({ type: "SET_CREATE_EDIT", payload: "create" });
  };

  // This lets the admin user edit the events when needed.
  function editEvent(iterator) {
    dispatch({ type: "SET_CURRENT_EVENT", payload: eventList[iterator] });
    dispatch({ type: "SET_CREATE_EDIT", payload: "edit" });
    console.log("Editing event with ID:", iterator);
    history.push(`/CreateEvent`);
  }
  return (
    <div className="adminMainText">
      <h1>My Events</h1>
      <div>
        <div>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            display="flex"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={1.5} direction="column">
              {eventList && // If eventList is empty do not map it, if eventList has data in it, then map it.
                eventList.map((event, iterator) => (
                  <EventListItem
                    key={event.id}
                    event={event}
                    iterator={iterator}
                    editEvent={() => editEvent(iterator)} // Pass the edit function to the EventListItem
                  />
                ))}
            </Stack>
          </Box>
        </div>

        <div className="newEvent">
          <button className="btn" onClick={createEvent}>
            Create new event
          </button>
        </div>
      </div>
    </div>
  );
}
export default EventList;
