import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Called from SOS-Alert component
function* postEmergency(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // send the request to create a new emergency--include the event id and user id as those are both needed when we create the emergency
    const response = yield axios.post(
      `/api/emergencies/${action.payload.eventID}/${action.payload.userID}`,
      config
    );
    // set the emeregency id in the store so the next pages know which event to update
    yield put({ type: "SET_EMERGENCY", payload: { id: response.data.id } });
  } catch (error) {
    console.log("emergency post request failed", error);
  }
}

function* postEmergencySaga() {
  yield takeLatest("POST_EMERGENCY", postEmergency);
}

export default postEmergencySaga;
