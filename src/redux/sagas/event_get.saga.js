import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Called from the EventList, Alerts, and SOS components
function* getEventList(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // initialize a variable so that we can access it outside of its if conditional
    let response;

    if (action.payload.user?.is_venue) {
      // if the user is a venue, they will only get the events corresponding to their id
      response = yield axios.get(
        `/api/events/${action.payload.user.id}`,
        config
      );
    } else {
      // if the user is not a venue, they will see all events
      response = yield axios.get(`/api/events`, config);
    }

    // clear the old events out
    yield put({ type: "UNSET_EVENT_LIST" });
    // update the reducer with the new events
    yield put({ type: "SET_EVENT_LIST", payload: response.data });
  } catch (error) {
    console.log("event get request failed", error);
  }
}

function* getEventListSaga() {
  yield takeLatest("GET_EVENT_LIST", getEventList);
}

export default getEventListSaga;
