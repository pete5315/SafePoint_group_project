import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Locations from "./Locations";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import swal from "sweetalert2";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";

function CreateEvent() {
  const history = useHistory();
  const dispatch = useDispatch();

  // User store/reducer
  const user = useSelector((store) => store.user);
  const currentEvent = useSelector((store) => store.currentEvent);
  const createEdit = useSelector((store) => store.createEdit);
  const locationStore = useSelector((store) => store.locations);

  // Local States
  const [eventName, setEventName] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [locations, setLocations] = useState(locationStore); // default value is the locations reducer
  const [eventVenue, setEventVenue] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs()); // default value is today's date

  // on load if admin is in edit mode then populate the event name and venue inputs
  // with the name and venue the event it already has, instead of an empty input field.
  useEffect(() => {
    if (createEdit === "edit") {
      setEventName(currentEvent.name);
      setEventVenue(currentEvent.venue);
    }
  }, []);

  // Delete Event Action
  function deleteButton() {
    swal // Sweet alerts, the popup confirmation asking if you want to delete the event or not.
      .fire({
        title: "Are you sure you want to delete this event?",
        text: "Click yes to confirm",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: "DELETE_EVENT",
            payload: { eventID: currentEvent.id },
          });
          history.push("/EventList");
          swal.fire("Deleted!", "The event has been deleted", "success");
        }
      });
  }

  // cancel button is clicked
  function cancelButton() {
    if (   // if event name all that stuff is not empty then throw a sweet alert
      eventName !== "" ||
      timeStart !== "" ||
      timeEnd !== "" ||
      locations.length !== 1 ||
      eventVenue !== ""
    ) {
      swal  // at the admin and asked if the admin wants to cancel the event creation
        .fire({
          title:
            "Are you sure you want to cancel event creation? You will lose all inputted data",
          text: "Click yes to confirm",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch({
              type: "DELETE_EVENT",
              payload: { eventID: currentEvent.id },
            });
            history.push("/EventList");
            swal.fire("Cancelled!", "Event creation cancelled", "success");
          }
        });
    } else {  //  or if it is empty then delete the empty event that was created from the server and bring the admin back to event list page.
      dispatch({ type: "DELETE_EVENT", payload: { eventID: currentEvent.id } });
      history.push("/EventList");
    }
  }

  // PUT EVENT ACTION
  // Update event is clicked
  const putEvent = () => {
    console.log(eventName, timeStart, timeEnd, eventVenue);
    if ( // if the input fields are empty,
      eventName === "" ||
      timeStart === "" ||
      timeEnd === "" ||
      eventVenue === ""
    ) {
      swal.fire({ // Sweet alert appears and tells the admin to field out the required fields to update.
        title:
          "You need to compete all fields including Start Time and End Time",
        text: "",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "It's form filling time!",
      });
    } else { // if all input fields are filled out then update that event with the input values
      dispatch({
        type: "PUT_EVENT",
        payload: {
          name: eventName,
          venue: eventVenue,
          start_time:
            selectedDate.format("YYYY-MM-DD") + " " + timeStart + "-05:00",
          end_time: selectedDate.format("YYYY-MM-DD") + " " + timeEnd,
          id: user.id,
          locations,
          eventID: currentEvent.id,
        },
      });

      // emptying input fields after btn is clicked
      setEventName("");
      setTimeStart("");
      setTimeEnd("");
      history.push("/EventList");
    }
  };

  // selecting the date.
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // selecting the start time
  const handleStartChange = (newDate) => {
    newDate && setTimeStart(newDate.format("HH:mm"));
  };

  // selecting the end time
  const handleEndChange = (newDate) => {
    newDate && setTimeEnd(newDate.format("HH:mm"));
  };

  return (
    <div className="adminMainText">
      {createEdit === "create" ? (
        <h1>
          <span>Create</span>{" "}
          <span>Event</span>
        </h1>
      ) : (
        <h1>Edit Event</h1>
      )}
      <div>
        <form>
          <div>
            <Input
              sx={{ m: 0.5, width: "25ch", backgroundColor: "#FFFFFF" }}
              type="text"
              name="eventName"
              placeholder=" Event Name"
              value={eventName}
              required
              onChange={(event) => setEventName(event.target.value)} // when the admin types in the input field, set the event name to what the admin typed.
            />
          </div>

          <div>
            <Input
              sx={{ m: 0.5, width: "25ch", backgroundColor: "#FFFFFF" }}
              type="text"
              name="eventVenue"
              placeholder=" Event Venue"
              value={eventVenue}
              required
              onChange={(event) => setEventVenue(event.target.value)} // Sets the event venue to what the admin typed in the input field.
            />
          </div>

          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "MobileDatePicker",
                  "DesktopDatePicker",
                  "StaticDatePicker",
                ]}
              >
                <DemoItem>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100"
                  >
                    <MobileDatePicker
                      value={selectedDate}
                      onChange={handleDateChange} // Selects the Date
                      sx={{
                        backgroundColor: "#FFFFFF",
                        width: "25ch",
                        marginBottom: 2,
                      }}
                    />
                  </Box>
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            {" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                sx={{ m: 0.5, width: "25ch", backgroundColor: "#FFFFFF" }}
                variant="outlined"
              >
                {/* the adornment shows the label text above the input field */}
                endAdornment=
                {
                  <InputAdornment position="end" sx={{ height: 0 }}>
                    Start Time
                  </InputAdornment>
                }
                <TimePicker
                  sx={{ backgroundColor: "#FFFFFF", marginTop: 2 }}
                  defaultValue={currentEvent && dayjs(currentEvent.start_time)}
                  value={timeStart}
                  onChange={(newStartTime) => handleStartChange(newStartTime)} // Selects the Start time
                />
              </FormControl>
              <br />
              <FormControl
                sx={{ m: 0.5, width: "25ch", backgroundColor: "#FFFFFF" }}
                variant="outlined"
              >
                endAdornment=
                {
                  <InputAdornment position="end" sx={{ height: 0 }}>
                    End Time
                  </InputAdornment>
                }
                <TimePicker
                  sx={{ backgroundColor: "#FFFFFF", marginTop: 2 }}
                  defaultValue={currentEvent && dayjs(currentEvent.end_time)}
                  value={timeEnd}
                  onChange={(newEndTime) => handleEndChange(newEndTime)} // selects the End Time
                />
              </FormControl>
            </LocalizationProvider>
          </div>
        </form>
      </div>

      <Locations
        currentEvent={currentEvent}
        locations={locations}
        setLocations={setLocations} // adds location 
        sx={{ backgroundColor: "#FFFFFF", marginTop: 2 }}
      />

      <div>
        {createEdit === "edit" ? ( // cancel button brings  the admin to event list
          <button className="btn" onClick={() => history.push("/EventList")}> 
            Cancel
          </button>
        ) : (
          <button className="btn" onClick={cancelButton}>
            Cancel
          </button>
        )}
        {createEdit && (
          <button className="btn" onClick={deleteButton}>
            Delete
          </button>
        )}
        {createEdit === "edit" ? (
          <button className="btn" onClick={putEvent}>
            Update
          </button>
        ) : (
          <button className="btn" onClick={putEvent}>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateEvent;
