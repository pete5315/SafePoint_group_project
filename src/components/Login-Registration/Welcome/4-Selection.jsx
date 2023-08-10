import React from "react";
import { useHistory } from "react-router-dom";
import "./WelcomeCSS/Welcome.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";

function Selection() {
  const history = useHistory();
  const dispatch = useDispatch();

  // sets the 'isvenue' to false if the attendee option is chosen
  const attendeeSelection = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_ISVENUE", payload: false });
    history.push("/Register");
  };

  // sets the 'isvenue' to true if the venue option is chosen
  const venueSelection = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_ISVENUE", payload: true });
    history.push("/Register");
  };
  return (
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
        <Typography variant="h4" gutterBottom>
          Please select the most fitting option:
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button
          style={{ backgroundColor: "#663399" }}
          variant="contained"
          onClick={attendeeSelection}
        >
          I am an event attendee
        </Button>
        <br />
        <br />
        <Button
          style={{ backgroundColor: "#663399" }}
          variant="contained"
          onClick={venueSelection}
        >
          I am a venue
        </Button>
      </Stack>
    </Box>
  );
}

export default Selection;
