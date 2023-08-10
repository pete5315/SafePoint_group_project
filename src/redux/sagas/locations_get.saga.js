import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Called from the Locations and Location components
function* getLocations(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    
    // request for the list of locations for the particular event
    const response = yield axios.get(
      `/api/events/locations/${action.payload}`,
      config
    );
    // once we get the locations from the server we need to save them to a reducer
    yield put({ type: "SET_LOCATIONS", payload: response.data });
  } catch (error) {
    console.log("locations get request failed", error);
  }
}

function* getLocationsSaga() {
  yield takeLatest("GET_LOCATIONS", getLocations);
}

export default getLocationsSaga;
