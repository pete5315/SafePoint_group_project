import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// called by alertmap and backbutton components
function* deleteEmergency(action) {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    
    // this is the delete an emergency request to the server
    yield axios.delete(
      `/api/emergencies/${action.payload.emergencyID}`,
      config
    );
    // after we delete an emergency, we need to update the emergency list
    if (action.payload.user.is_venue === true) {
      yield put({
        type: "GET_EMERGENCY_LIST",
        payload: { eventID: action.payload.eventID },
      });
    }
  } catch (error) {
    console.log("emergency delete request failed", error);
  }
}

function* deleteEmergencySaga() {
  yield takeLatest("DELETE_EMERGENCY", deleteEmergency);
}

export default deleteEmergencySaga;
