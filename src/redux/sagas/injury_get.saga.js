import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Called from the Injury component
function* getInjury(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // get request for the list of injuries
    const response = yield axios.get(`/api/injuries/${action.payload}`, config);
    // once we get the information from the server, we need to save it to a reducer
    yield put({ type: "SET_INJURIES", payload: response.data });
  } catch (error) {
    console.log("injury get request failed", error);
  }
}

function* getInjurySaga() {
  yield takeLatest("GET_INJURIES", getInjury);
}

export default getInjurySaga;
