import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./AUcss/AU.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Injury() {
  const history = useHistory();
  const dispatch = useDispatch();
  // Store reducers
  const emergency = useSelector((store) => store.emergency);
  const user = useSelector((store) => store.user);
  const injuries = useSelector((store) => store.injuries);
  console.log(injuries);

  // local state to hold the injury value
  const [injury, setInjury] = useState("");

  const [clickedButton, setClickedButton] = useState(false); // used to change the color of the injury button if it has been selected
  // Get the injuries on page load
  useEffect(() => {
    dispatch({ type: "GET_INJURIES", payload: user.id });
  }, []);

  const selectedInjury = (injuryId) => {
    // changes color of selected injury
    setInjury(injuryId); // this is for the sending the data of which is selected
    setClickedButton(injuryId); // This is for changing the color when selected
  };

  const injuryType = () => {
    if (injury === "") {
      alert("You need to identify the emergency");
      return;
    }
    console.log({ ...emergency, type: injury });
    dispatch({
      type: "PUT_EMERGENCY",
      payload: { ...emergency, type: injury },
    });

    history.push("/Location");
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
            What's Happening Near You?
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
            {injuries &&
              injuries.map((injury, i) => (
                <Button
                  style={{
                    backgroundColor:
                      clickedButton === injury.id ? "#663399" : "#7B68EE",
                  }}
                  variant="contained"
                  key={i}
                  onClick={() => selectedInjury(injury.id)}
                >
                  {injury.type}
                </Button>
              ))}
            <br />
            <br />
            <Button
              style={{ backgroundColor: "#663399" }}
              variant="contained"
              onClick={injuryType}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default Injury;
