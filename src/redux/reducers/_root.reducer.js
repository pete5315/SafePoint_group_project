import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";

import currentEmergencies from "./currentEmergencies.reducer";
import currentEvent from "./currentEvent.reducer";
import emergency from "./emergency.reducer";
import eventList from "./eventList.reducer";
import surveyResponses from "./surveyResponses.reducer";
import locations from "./locations.reducer";
import createEdit from "./createEdit.reducer";
import injuries from "./injuries.reducer";
import isVenue from "./isVenue.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  currentEmergencies, // the list of emergencies for an event
  currentEvent, // the current event for a user creating an emergency
  emergency, // the current emergency for a user creating an emergency or an admin editing an emergency
  eventList, // the list of events (in toto for user or specific to any particular venue)
  surveyResponses, // list of survey responses
  locations, // list of locations, used during emergency creation
  createEdit, // used to conditionally render the create/edit event component
  injuries, // list of possible emergencies
  isVenue, // saves venue selection when user registers
});

export default rootReducer;
