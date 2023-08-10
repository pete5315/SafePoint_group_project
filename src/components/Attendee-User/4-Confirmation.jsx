import "./AUcss/AU.css";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Confirmation() {
  const history = useHistory();
  // stores for component
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
  // checks the status of the emergency every 3 seconds to see if it is done and pushes to the survey if it is
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
    <div>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "80vh", // Change spacing between the button and the please keep the app open
          textAlign: "center",
        }}
      >
        <Stack spacing={3} direction="column">
          <h2>Event Management is on their way</h2>
          <br></br>
          <p>Please keep the app open until help arrives</p>
        </Stack>

        <Button
          onClick={() => history.push("/FirstAid")}
          key={location.id}
          style={{ backgroundColor: "#7B68EE" }}
          variant="contained"
        >
          What can I do now?
        </Button>
      </Box>
    </div>
  );
}

export default Confirmation;
