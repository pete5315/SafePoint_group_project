import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// called from the CreateEvent component
function* putEvent(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // the admin updates the current event information
    const response = yield axios.put(
      `/api/events/${action.payload.id}`,
      action.payload,
      config
    );
    // after we update information we update the current event reducer with the response information
    yield put({ type: "SET_CURRENT_EVENT", payload: { id: response.data[0] } });
  } catch (error) {
    console.log("event put request failed", error);
  }
}

function* putEventSaga() {
  yield takeLatest("PUT_EVENT", putEvent);
}

export default putEventSaga;
