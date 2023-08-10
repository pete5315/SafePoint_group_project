import React from "react";
import { useHistory } from "react-router-dom";
import "./WelcomeCSS/Welcome.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function Purpose() {
  // creating the history variable to be used
  const history = useHistory();

  // function to move the user to the next page
  const nextPage = () => {
    history.push("/Justification");
  };

  const goToWelcome = () => {
    history.push("/Welcome");
  };

    // the second page that is seen when the app is opened, gives information about safepoint
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
        onClick={() => nextPage()}
      >
        <Stack spacing={3} direction="column">
          <br />
          <Typography variant="h3" gutterBottom>
            SafePoint
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="subtitle1" gutterBottom>
            Event attendees can inform event management in just 3 easy clicks to
            let them know what has happened and where you are.
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Stack>
      </Box>
      <div className="progressIcons">
        <RadioButtonUncheckedIcon onClick={goToWelcome} />
        <RadioButtonCheckedIcon />
        <RadioButtonUncheckedIcon onClick={nextPage} />
      </div>
      <div onClick={() => nextPage()}>
        <br />
        <br />
      </div>
    </>
  );
}

export default Purpose;
