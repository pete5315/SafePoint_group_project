import axios from "axios";
import { takeLatest } from "redux-saga/effects";

// Called from the Survey component
function* postSurveyResponse(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    // server request to post a survey response
    yield axios.post(
      `/api/survey/${action.payload.emergency_ID}`,
      action.payload,
      config
    );
  } catch (error) {
    console.log("User posting survey request failed", error);
  }
}

function* postSurveyResponseSaga() {
  yield takeLatest("POST_SURVEY_RESPONSE", postSurveyResponse);
}

export default postSurveyResponseSaga;
