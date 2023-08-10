import axios from "axios";
import { takeLatest } from "redux-saga/effects";

// Called from the CreateEvent and BackButton components
function* deleteEvent(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // request to delete an event from the admin
    yield axios.delete(`/api/events/${action.payload.eventID}`, config);
  } catch (error) {
    console.log("event delete request failed", error);
  }
}

function* deleteEventSaga() {
  yield takeLatest("DELETE_EVENT", deleteEvent);
}

export default deleteEventSaga;
