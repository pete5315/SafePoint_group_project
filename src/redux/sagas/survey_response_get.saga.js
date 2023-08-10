import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Called from the SurveyResults component
function* getSurveyResults(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // get request for the list of survey responses
    const response = yield axios.get(
      `/api/survey/${action.payload.eventID}`,
      config
    );
    // once we get the responses, we need to save them to a reducer 
    yield put({ type: "SET_SURVEY_RESULTS", payload: response.data });
  } catch (error) {
    console.log("survey responses get request failed", error);
  }
}

function* getSurveyResultsSaga() {
  yield takeLatest("GET_SURVEY_RESULTS", getSurveyResults);
}

export default getSurveyResultsSaga;
