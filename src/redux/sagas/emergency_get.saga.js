import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// called from AlertMap and Alerts components
// called from deleteEmergency and putEmergency sagas
function* getEmergencyList(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // this is the request to get the details of the emergencies tied to a particular event
    const response = yield axios.get(
      `/api/emergencies/${action.payload.eventID}`,
      config
    );
    // once we get them, we need to store them in a reducer so they are generally available
    yield put({ type: "SET_CURRENT_EMERGENCIES", payload: response.data });
  } catch (error) {
    console.log("emergency get request failed", error);
  }
}

// called from AlertMap, Alerts, FirstAid, and BackButton components
function* getCurrentEmergency(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // get the details of a particular emergency
    const response = yield axios.get(
      `/api/emergencies/emergency/${action.payload.emergencyID}`,
      config
    );

    //once we get it, we need to set it
    yield put({ type: "SET_EMERGENCY", payload: response.data[0] });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* getEmergencyListSaga() {
  yield takeLatest("GET_EMERGENCY_LIST", getEmergencyList);
  yield takeLatest("GET_CURRENT_EMERGENCY", getCurrentEmergency);
}

export default getEmergencyListSaga;
