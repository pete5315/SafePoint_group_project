import Button from "@mui/material/Button";
import UndoIcon from "@mui/icons-material/Undo";
import { useLocation, useHistory } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function BackButton() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  let locationPathname = location.pathname;
  // stores for the component
  let emergency = useSelector((store) => store.emergency);
  let currentEvent = useSelector((store) => store.currentEvent);
  let user = useSelector((store) => store.user);
  let createEdit = useSelector((store) => store.createEdit);

  // gets the current emergency
  useEffect(() => {
    console.log(emergency);
    emergency &&
      dispatch({
        type: "GET_CURRENT_EMERGENCY",
        payload: { emergencyID: emergency.id },
      });
  }, []);

  // function uses a switch function to determine where to send the user when the back button is clicked.
  function goBack() {
    let newLocationString = locationSwitch();
    if (newLocationString === "/Login") {
      dispatch({ type: "LOGOUT" });
    }
    if (newLocationString === "/Location") {
      console.log(emergency.status);
      // dispatch putemergency to remove location if status is still red
      if (emergency.status === null || emergency.status === undefined) {
        dispatch({
          type: "PUT_EMERGENCY",
          payload: { ...emergency, location: 1 },
        });
      }
    }
    if (newLocationString === "/Register") {
      dispatch({ type: "LOGOUT" });
    }
    if (newLocationString === "/SOS") {
      // if user hits back button to return to SOS page, we want to delete the emergency they just posted and unset it as well
      dispatch({
        type: "DELETE_EMERGENCY",
        payload: { eventID: currentEvent, emergencyID: emergency.id, user },
      });
      dispatch({ type: "UNSET_INJURIES" });
      dispatch({ type: "UNSET_EMERGENCY" });
      dispatch({ type: "UNSET_CURRENT_EVENT" });
    }
    if (newLocationString === "/Injury") {
      // if user leaves locations, we want to unset those locations in the local state
      dispatch({ type: "UNSET_LOCATIONS" });
    }
    // deletes the event if the back button is pushed and the user is in create mode for an event rather than edit
    if (newLocationString === "/EventList") {
      if (createEdit === "create") {
        dispatch({
          type: "DELETE_EVENT",
          payload: { eventID: currentEvent.id },
        });
      }
    }
    history.push(newLocationString);
  }

  // function to determine where to send the user on a case by case basis
  function locationSwitch() {
    console.log(location.pathname);
    switch (locationPathname) {
      case "/":
        return "";
      case "/Welcome":
        return "";
      case "/Purpose":
        return "Welcome";
      case "/Justification":
        return "Purpose";
      case "/SOS":
        return "Login";
      case "/Selection":
        return "Justification";
      case "/Register":
        return "Selection";
      case "/Injury":
        return "/SOS";
      case "/Location":
        return "/Injury";
      case "/Confirmation":
        return "/Location";
      case "/FirstAid":
        return "/Confirmation";
      case "/Survey":
        return "/SOS";
      case "/EventList":
        return "Login";
      case "/CreateEvent":
        return "/EventList";
      case "/Alerts":
        return "EventList";
      case "/SurveyResponse":
        return "EventList";
      case "/Info":
        return "Register";
      case "/Login":
        return "Selection";
      default:
        return "/";
    }
  }

  // if the user is on any of the initial pages the back button does not appear
  if (
    location.pathname !== "/Welcome" &&
    location.pathname !== "/EventList" &&
    location.pathname !== "/SOS"
  ) {
    return (
      <div className="backbutton">
        <Button className="" onClick={() => history.push(goBack())}>
          <UndoIcon />
        </Button>
      </div>
    );
  } else {
    // 🤫🫠
    return <span className="invisSpan">??? ? ???</span>;
  }
}

export default BackButton;
