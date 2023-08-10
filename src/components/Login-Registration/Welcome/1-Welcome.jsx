import React from "react";
import { useHistory } from "react-router-dom";
import "./WelcomeCSS/Welcome.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function Welcome() {
  const history = useHistory();

  const nextPage = () => {
    history.push("/Purpose");
  };

  const goToJustification = (event) => {
    event.preventDefault();
    history.push("/Justification");
  };

  // the first page that is seen when the app is opened, gives information about safepoint
  return (
    <div>
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
            Welcome!
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="subtitle1" gutterBottom>
            Welcome to SafePoint! Where emergency response is just one click
            away at your next concert or event! Click anywhere to learn more.
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
        <RadioButtonCheckedIcon />
        <RadioButtonUncheckedIcon onClick={nextPage} />
        <RadioButtonUncheckedIcon onClick={goToJustification} />
      </div>
      <div onClick={() => nextPage()}>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Welcome;
