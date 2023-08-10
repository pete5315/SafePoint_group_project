import React from "react";
import "./AUcss/AU.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SOSMap(props) {
  let events = useSelector((store) => store.eventList);
  let event = useSelector((store) => store.currentEvent);

  // maps the events into a dropdown menu
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        display="flex"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      ></Box>
      <br />
      <br />
      <br />
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        display="flex"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 222 }}
          style={{ backgroundColor: "aliceblue" }}
        >
          <InputLabel id="event-selector">Event</InputLabel>
          <Select
            labelId="event-selector"
            id="event-selector"
            value={event}
            onChange={props.handleChange}
          >
            {events.map((event, i) => (
              <MenuItem value={event.id} key={i}>
                {event.name + " at " + event.venue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default SOSMap;
