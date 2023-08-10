import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import swal from "sweetalert2";
import PlaceIcon from "@mui/icons-material/Place";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

function AlertMap(props) {
  let emergency = props.emergency;
  const dispatch = useDispatch();

  // Reducers
  const currentEvent = useSelector((store) => store.currentEvent);
  const user = useSelector((store) => store.currentEvent);

  // Delete Btn clicked
  function deleteEmergency() {
    swal
      .fire({ // Sweet alerts pop up to confirm the deletion of the event
        title: "Are you sure you want to delete this emergency?",
        text: "Click yes to comfirm",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) { // if yes, then delete event
          dispatch({
            type: "DELETE_EMERGENCY",
            payload: {
              eventID: currentEvent.id,
              emergencyID: emergency.id,
              user,
            },
          });
          dispatch({
            type: "GET_EMERGENCY_LIST",
            payload: { eventID: currentEvent.id },
          });
          swal.fire("Deleted!", "The event has been deleted", "Success"); // shows a  pop up to show user that the event has been deleted
        } else {
          swal.fire("Delete Cancelled"); // if the user did not want to delete the event then, "Delete Cancelled"
        }
      });
  }

  // when an alert is clicked
  const handleClickOpen = (id) => {
    dispatch({ type: "GET_CURRENT_EMERGENCY", payload: { emergencyID: id } }); // grabs the info of the alert
    setTimeout(() => props.setOpen(true), 500); // show pop up
  };

  // changes the color of the alert depending on the status of the event
  function getColor(status) {
    if (status === 1) {
      return "rgb(52, 193, 52)";
    } else if (status === 2) {
      return "rgb(203, 203, 12)";
    } else {
      return "rgb(192, 14, 14)";
    }
  }

  return (
    <Card
      key={emergency.id}
      sx={{
        backgroundColor: getColor(emergency && emergency.status * 1),
        minWidth: 250,
        margin: 5,
      }}
    >
      <CardHeader
        action={
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteEmergency()}
          >
            <DeleteForeverIcon sx={{ color: "white" }} />
          </IconButton>
        }
        title=<Typography onClick={() => handleClickOpen(emergency.id)}>
          {emergency &&
            ((emergency.timecreated.slice(11, 13) * 1 + 6) % 12) +
              1 +
              ":" +
              emergency.timecreated.slice(14, 16) +
              (emergency.timecreated.slice(14, 16) * 1 > 4
                ? emergency.timecreated.slice(11, 13) * 1 > 16
                  ? "pm"
                  : " am"
                : " pm")}
        </Typography>
        subheader=<Typography
          sx={{ fontWeight: "bold" }}
          onClick={() => handleClickOpen(emergency.id)}
        >
          <PlaceIcon sx={{ fontSize: "medium" }} /> LOCATION:{" "}
          {emergency.location}
          <br />
          <ReportProblemIcon sx={{ fontSize: "medium" }} /> TYPE:{" "}
          {emergency.type}
        </Typography>
      />
    </Card>
  );
}

export default AlertMap;
