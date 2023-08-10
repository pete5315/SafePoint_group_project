import "./AUcss/AU.css";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Location() {
  const history = useHistory();
  // local state for temporarily storing the location
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  // Stores for component
  const emergency = useSelector((store) => store.emergency);
  const locations = useSelector((store) => store.locations);
  const currentEvent = useSelector((store) => store.currentEvent);
  // local state for conditional rendering
  const [clickedButton, setClickedButton] = useState(false);
  // gets the locations when the page loads
  useEffect(() => {
    dispatch({ type: "GET_LOCATIONS", payload: currentEvent });
  }, []);

  // if no location is selected it will error
  const locationType = () => {
    if (location === "") {
      alert("You need to identify the location");
      return;
    }
    // sends the selected location to the db
    dispatch({
      type: "PUT_EMERGENCY",
      payload: { ...emergency, location: location.id },
    });
    history.push("/Confirmation");
  };

  // changes the color of the button and sets the local state of location
  const selectedLocation = (id, location) => {
    setLocation(location);
    setClickedButton(id);
  };

  return (
    <>
      <div>
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
          <Typography variant="h5" gutterBottom>
            Where are you?
          </Typography>
        </Box>
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
          <Stack spacing={3} direction="column">
            {locations &&
              locations.map((location) => (
                <Button
                  className="btn"
                  key={location.id}
                  style={{
                    backgroundColor:
                      clickedButton === location.id ? "#663399" : "#7B68EE",
                  }}
                  variant="contained"
                  onClick={() => selectedLocation(location.id, location)}
                >
                  {location.name}
                </Button>
              ))}
            <br />
            <br />
            <Button
              style={{ backgroundColor: "#663399" }}
              variant="contained"
              onClick={locationType}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default Location;
