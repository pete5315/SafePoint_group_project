import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// called from the EventList component
function* postEvent(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // post a new event by the admin
    const response = yield axios.post(
      `/api/events/${action.payload.id}`,
      config
    );
    // after we post it we set it as the current event 
    yield put({
      type: "SET_CURRENT_EVENT",
      payload: { id: response.data[0].id },
    });
  } catch (error) {
    console.log("event post request failed", error);
  }
}

function* postEventSaga() {
  yield takeLatest("POST_EVENT", postEvent);
}

export default postEventSaga;
