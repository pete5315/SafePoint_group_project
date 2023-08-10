import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SurveyResults() {
  const dispatch = useDispatch();

  // Reducer
  const surveys = useSelector((store) => store.surveyResponses);

  // on page load, get surver results
  useEffect(() => {
    dispatch({ type: "GET_SURVEY_RESULTS" });
  }, []);

  if (surveys.length === 0) {
    return (
      <div>
        <p>Survey Results for (currentEvent here)</p>
        <p>No surveys complete at this time, check back later</p>
      </div>
    );
  } else if (surveys.length > 0) {
    return (
      <div>
        <p>Survey Results for (currentEvent here)</p>
        {surveys.map((survey) => (
          <p key={survey.id}>
            {survey.emergency_id}
            <br />
            {survey.question_set}
            <br />
            {survey.response_details}
            {/* add in edit features for notes if we're still doing it */}
            <button>Add Notes</button>
            <br />
            Review submitted by: {survey.user_id}
            <br />
            Contact your administrator for more info about user {survey.user_id}
            .
          </p>
        ))}
      </div>
    );
  }
}

export default SurveyResults;
