import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import getEventListSaga from "./event_get.saga";
import postEventSaga from "./event_post.saga";
import putEventSaga from "./event_put.saga";
import deleteEventSaga from "./event_delete.saga";
import getEmergencyListSaga from "./emergency_get.saga";
import postEmergencySaga from "./emergency_post.saga";
import putEmergencySaga from "./emergency_put.saga";
import deleteEmergencySaga from "./emergency_delete.saga";
import postSurveyResponseSaga from "./survey_response_post.saga";
import getSurveyResponsesSaga from "./survey_response_get.saga";
import getLocationsSaga from "./locations_get.saga";
import getInjurySaga from "./injury_get.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    getEventListSaga(),
    postEventSaga(),
    putEventSaga(),
    deleteEventSaga(),
    getEmergencyListSaga(),
    postEmergencySaga(),
    putEmergencySaga(),
    deleteEmergencySaga(),
    postSurveyResponseSaga(),
    getSurveyResponsesSaga(),
    getLocationsSaga(),
    getInjurySaga(),
  ]);
}
