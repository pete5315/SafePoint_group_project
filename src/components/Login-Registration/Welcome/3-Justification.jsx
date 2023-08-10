import React from "react";
import { useHistory } from "react-router-dom";
import "./WelcomeCSS/Welcome.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function Justification() {
  // creating the history variable to be used
  const history = useHistory();

  // function to move the user to the next page
  const nextPage = () => {
    history.push("/Selection");
  };

  const goToPurpose = () => {
    history.push("/Purpose");
  };

    // the third page that is seen when the app is opened, gives information about safepoint
    // as well as a button to continue to the selection page where a user can start registering
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
      >
        <Stack spacing={3} direction="column">
          <br />
          <Typography variant="h3" gutterBottom>
            Our Vision
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="subtitle1" gutterBottom>
            Event management can more easily maintain large crowds, and get help
            to where it's needed, while promoting a fun experience.
          </Typography>
          <br />
          <Button
            style={{ backgroundColor: "#663399" }}
            variant="contained"
            onClick={() => history.push("/Selection")}
          >
            Let's Get Started!
          </Button>
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
          {/* <br /> commented out to match heights. it isnt perfect but better*/}
          <div className="progressIcons">
            <RadioButtonUncheckedIcon />
            <RadioButtonUncheckedIcon onClick={goToPurpose} />
            <RadioButtonCheckedIcon onClick={nextPage} />
          </div>
        </Stack>
      </Box>
      <div>
        <br />
        <br />
      </div>
    </>
  );
}

export default Justification;
