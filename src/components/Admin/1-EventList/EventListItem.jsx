import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { useDispatch } from "react-redux";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

function EventListItem({ event, editEvent, iterator }) {
  const dispatch = useDispatch();
  const history = useHistory();

// when an event is clicked the admin is directed to the page /Alerts and uses the information of that single event and grabs the alerts from that event.
function eventClick() {
  dispatch({
    type: "SET_CURRENT_EVENT",
    payload: event,
  });
  history.push("/Alerts");
}

  return (
    <div key={event.id}>
      <Card
        sx={{ backgroundColor: "#c4aee0", minWidth: 300, textAlign: "center" }}
      >
        <CardHeader
          action={
            <Fab size="small" onClick={() => editEvent(iterator)}>
              <EditIcon />
            </Fab>
          }
          title=<Typography onClick={() => eventClick()}>
            {event.name}
          </Typography>
          subheader=<Typography
            sx={{ fontSize: 15 }}
            onClick={() => eventClick()}
          >
            {event.date}
            <AccessTimeFilledIcon sx={{ fontSize: "medium" }} />{" "}
            {event && // If there is no alerts for that event then don't render anything, if there is alerts for that event then render the time.
              ((event.start_time.slice(11, 13) * 1 + 6) % 12) + // slice takes out the 13th character/letter of the time stamp so that it looks like  9:44 AM  
                1 +
                ":" +
                event.start_time.slice(14, 16) +
                (event.start_time.slice(11, 13) * 1 > 4
                  ? event.start_time.slice(11, 13) * 1 > 16
                    ? "pm"
                    : "am"
                  : "pm")}{" "}
            -{" "}
            {event &&
              ((event.end_time.slice(11, 13) * 1 + 6) % 12) +
                1 +
                ":" +
                event.end_time.slice(14, 16) +
                (event.end_time.slice(11, 13) * 1 > 4
                  ? event.end_time.slice(11, 13) * 1 > 16
                    ? "pm"
                    : "am"
                  : "pm")}
            <br />
            <PlaceIcon sx={{ fontSize: "small" }} /> {event.venue}
          </Typography>
        />
      </Card>
    </div>
  );
}

export default EventListItem;
