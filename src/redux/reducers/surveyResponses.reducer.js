const surveyResponses = (state = [], action) => {
  switch (action.type) {
    case "SET_SURVEY_RESULTS":
      return action.payload;
    case "UNSET_SURVEY_RESULTS":
      return null;
    default:
      return state;
  }
};

export default surveyResponses;
