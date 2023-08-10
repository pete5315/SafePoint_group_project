import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AUcss/AU.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";

function SOSAlert() {
  const history = useHistory();
  const dispatch = useDispatch();
  // stores for the component
  let user = useSelector((store) => store.user);
  let event = useSelector((store) => store.currentEvent);

  // posts the emergency to the db
  const reportEmergency = () => {
    dispatch({
      type: "POST_EMERGENCY",
      payload: { userID: user.id, eventID: event },
    });
    history.push("/Injury");
  };

  return (
    <div>
      {/* adjust spacing between the drop down */}
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
        <Typography variant="h5" gutterBottom>
          Press SOS to Alert Event Management
        </Typography>
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={10} // Change distance from the Press SOS text
      >
        {/* This changes the size of the circle and the font */}
        <Fab
          sx={{ fontSize: "60px", width: "184px", height: "184px" }}
          color="error"
          aria-label="SOS"
          onClick={reportEmergency}
        >
          SOS
        </Fab>
      </Box>
    </div>
  );
}

export default SOSAlert;
