import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./AUcss/AU.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";

function FirstAid() {
  const history = useHistory();
  let currentEvent = useSelector((store) => store.currentEvent);
  let emergency = useSelector((store) => store.emergency);
  let user = useSelector((store) => store.user);
  let dispatch = useDispatch();

  // checks the status of the emergency every 3 seconds to see if it is done
  function useInterval(callback, delay) {
    useEffect(() => {
      const interval = setInterval(callback, delay);
      return () => clearInterval(interval);
    }, [callback, delay]);
  }
  // checks the status of the emergency every 3 seconds to see if it is done
  useInterval(() => {
    dispatch({
      type: "GET_CURRENT_EMERGENCY",
      payload: { emergencyID: emergency.id, eventID: currentEvent, user },
    });
    if (emergency.status === 1) {
      history.push("/Survey");
    }
  }, 3000);

  return (
    <div className="test">
      <Stack spacing={3} direction="column">
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          textAlign="center"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" gutterBottom>
            While waiting for Event Management...
          </Typography>
          <br />
          <li> Create space for the injured person.</li>
          <br />
          <li>
            Tell people around you to flash their phone lights back toward the
            crowd.
          </li>
          <br />
          <li>
            Assess the situation, look for medical professionals, water, or
            snacks.
          </li>
          <br />
          <li>Keep the app open until event managment arrives.</li>
          <br />
        </Box>
      </Stack>
    </div>
  );
}

export default FirstAid;
