import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Called from Injury, Location, and BackButton components
function* putEmergency(action) { //user version
  console.log(action.payload);
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // update request for the user to send updated information about the emergency to the server
    const response = yield axios.put(
      `/api/emergencies/${action.payload.id}`,
      action.payload,
      config
    );
    // update the reducer with the new data
    yield put({ type: "SET_EMERGENCY", payload: { ...response.data } });
  } catch (error) {
    console.log("emergency put request failed", error);
  }
}

// Called from the AlertDetailsDialog component
function* updateStatus(action) { //admin version
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // update request from the admin to change the status and/or notes of an emergency
    yield axios.put(
      `/api/emergencies/emergency/${action.payload.emergencyID}`,
      action.payload,
      config
    );
    // once we update the status of an emergency, we need to go get the emergency list again so it shows up correctly for the admin
    yield put({ type: "GET_EMERGENCY_LIST", payload: action.payload.eventID });
  } catch (error) {
    console.log("emergency put request failed", error);
  }
}

function* putEmergencySaga() {
  yield takeLatest("PUT_EMERGENCY", putEmergency);
  yield takeLatest("PUT_STATUS", updateStatus);
}

export default putEmergencySaga;
