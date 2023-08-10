import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "../AdminCSS/Admin.css";

export default function AlertDetailsDialog(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // Reducer
  const currentEmergency = useSelector((store) => store.emergency);

  // Local States
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [currentStatus, setCurrentStatus] = useState();
  const [statusValue, setStatusValue] = useState();
  const [adminNotes, setAdminNotes] = useState();

  // on page load,
  useEffect(() => {
    setAdminNotes(currentEmergency.admin_notes); // set Admin Notes of the event.
    setCurrentStatus(currentEmergency.status); // Set current Status of the event.
    setStatusValue(currentEmergency.status); // change the current status  of the event when a new status is clicked.
  }, []);

  // changes the current status bar to the color that the admin clicked on.
  function getColorBarsClass(status) {
    if (status === 1) {
      return "colorBars green";
    } else if (status === 2) {
      return "colorBars yellow";
    } else {
      return "colorBars red";
    }
  }

  // cancel btn clicked
  const handleCancel = () => {
    props.setOpen(false); // closes the pop up
    setOpenBackdrop(true);
    setTimeout(() => setOpenBackdrop(false), 1000); // run the spinning loading screen thingy
    setTimeout(() => history.push("/Alerts"), 750); // directs admin user back to alerts page
  };

  // update btn clicked
  const handleUpdate = () => {
    props.setOpen(false); // closes the pop up
    setOpenBackdrop(true);
    setTimeout(() => setOpenBackdrop(false), 1000); // run the spinning loading screen thingy
    setTimeout(() => history.push("/Alerts"), 750); // directs admin user back to alerts page
    dispatch({ 
      type: "PUT_STATUS", // update the status to the what the admin clicked 
      payload: { statusValue, emergencyID: currentEmergency.id, adminNotes },
    });
  };

  // handles the changing of alert status
  const handleStatusItemClick = (status) => {
    setCurrentStatus(status);
    setStatusValue(status);
  };

  // Update currentStatus with the initial value of currentEmergency.status
  // color will match what its status is
  useEffect(() => {
    setCurrentStatus(currentEmergency.status);
  }, [currentEmergency.status]);

  return (
    <div>
      <Dialog
        open={props.open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        {currentEmergency && (
          <DialogContent sx={{ backgroundColor: "rgb(6, 1, 50)" }}>
            <DialogContentText
              sx={{ color: "aliceblue" }}
              id="alert-dialog-slide-description"
            >
              <a>
                {" "}
                <span className="bold">Time</span>:{" "}
                {currentEmergency &&
                  Object.keys(currentEmergency).length > 1 &&
                  currentEmergency.timecreated.length > 0 &&
                  ((currentEmergency.timecreated.slice(11, 13) * 1 + 6) % 12) +
                    1 +
                    ":" +
                    currentEmergency.timecreated.slice(14, 16) +
                    (currentEmergency.timecreated.slice(14, 16) * 1 > 4
                      ? currentEmergency.timecreated.slice(11, 16) * 1 > 16
                        ? "PM"
                        : "AM"
                      : "PM")}
              </a>
              <br />
              <a>
                {" "}
                <span className="bold">Type</span>: {currentEmergency.type}
              </a>
              <br />
              <a>
                {" "}
                <span className="bold">Location</span>:{" "}
                {currentEmergency.location}
              </a>
              <br />
              <br />
              <a>
                <c>
                  <span>Current Status:</span>
                </c>
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
                  <b
                    id="currentStatusBox"
                    className={getColorBarsClass(currentStatus)}
                  ></b>
                </Box>
              </a>
              <Box
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                display="flex"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
              >
                <Stack spacing={1} direction="column">
                  <a>Update Status:</a>
                  <Button
                    sx={{
                      backgroundColor: "rgb(52, 193, 52)",
                      minWidth: 150,
                      color: "black",
                    }}
                    variant="contained"
                    className={`colorBox green ${
                      currentStatus === 1 ? "selected" : ""
                    }`}
                    onClick={() => handleStatusItemClick(1)}
                  >
                    Resolved
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "rgb(203, 203, 12)",
                      minWidth: 150,
                      color: "black",
                    }}
                    variant="contained"
                    className={`colorBox yellow ${
                      currentStatus === 2 ? "selected" : ""
                    }`}
                    onClick={() => handleStatusItemClick(2)}
                  >
                    In Progress
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "rgb(192, 14, 14)",
                      minWidth: 150,
                      color: "black",
                    }}
                    variant="contained"
                    className={`colorBox red ${
                      currentStatus === 3 ? "selected" : ""
                    }`}
                    onClick={() => handleStatusItemClick(3)}
                  >
                    Unresolved
                  </Button>
                </Stack>
              </Box>
              <br />
              <label htmlFor="adminNotes">
                <span>Notes:</span>
              </label>
              <textarea
                name="adminNotes"
                cols={32}
                rows={5}
                placeholder={adminNotes}
                onChange={(event) => setAdminNotes(event.target.value)}
              ></textarea>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions sx={{ backgroundColor: "rgb(6, 1, 50)" }}>
          <button
          className="btn"
            sx={{ backgroundColor: "rgb(16, 4, 108)", color: "aliceblue" }}
            variant="filled"
            onClick={handleCancel}
            
          >
            Cancel
          </button>
          <button
          className="btn"
            sx={{ backgroundColor: "rgb(17, 3, 119)", color: "aliceblue" }}
            variant="filled"
            onClick={handleUpdate}
          >
            Update
          </button>
        </DialogActions>
      </Dialog>

      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}
