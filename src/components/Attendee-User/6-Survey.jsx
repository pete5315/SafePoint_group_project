import "./AUcss/AU.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./AUcss/AU.css";

function Survey() {
  const history = useHistory();
  const emergency = useSelector((store) => store.emergency);

  // local state for the rating of help recieved
  const [question1Response, setquestion1Response] = useState(3);
  const [question3Response, setQuestion3Response] = useState("");
  const [responseNotes, setResponseNotes] = useState("");
  const dispatch = useDispatch();

  // questions for the survey
  const question2Responses = [
    "They were timely",
    "They were not timely",
    "They came prepared",
    "They did not come prepared",
    "I had issues with network connection",
  ];

  const [question2Response, setQuestion2Response] = useState(

    question2Responses.map((text) => ({ text, value: false }))
  );

  // questions for the survey
  const question3Responses = [
    "Not very likely",
    "Somewhat likely",
    "Likely",
    "Very likely",
  ];

  function changeQuestion2Responses(i) {
    setQuestion2Response(
      question2Response.map((value, index) =>
        index === i
          ? { text: value.text, value: !value.value }
          : { text: value.text, value: value.value }
      )
    );
  }

  // posts the user answers to the db
  const PostSurveyResponse = () => {
    dispatch({
      type: "POST_SURVEY_RESPONSE",
      payload: {
        emergency_ID: emergency.id,
        question1:
          "Please rate how unhelpful or helpful was Event Management today in addressing this emergency?",
        question2:
          "What was helpful or unhelpful about Event Management addressing your situation today",
        question3: "How likely are you to recommend this app to a friend?",
        question1Response,
        question2Response: question2Response
          .filter((option) => option.value === true)
          .map((option) => option.text),
        question3Response,
        responseNotes,
      },
    });
    history.push("/SOS");
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div className="surveyContainer">
      <form onSubmit={PostSurveyResponse}>
        <p className="center2">Thank you for your feedback.</p>
        <ol>
          <div>
            <div>
              <li>
                Please rate how unhelpful or helpful was Event Management today
                in addressing this emergency?
              </li>
              <Box sx={{ width: 150, marginLeft: 8 }}>
                {/* Step is how much each tick changes it by, min is lowest value, max is highest value, default is how it will appear before touching it */}
                <Slider
                  onChange={(event) => setquestion1Response(event.target.value)}
                  aria-label="Temperature"
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  value={question1Response}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  color="secondary"
                />
              </Box>
            </div>
          </div>
          {/* Multi-Select */}
          <div>
            <li>
              What was helpful or unhelpful about Event Management addressing
              your situation today
            </li>
            <div className="alignLeft">
              {question2Responses.map((response, i) => (
                <div key={i}>
                  <label>
                    <span className="alignRight">
                      <input
                        type="checkbox"
                        onChange={() => changeQuestion2Responses(i)}
                      />
                    </span>
                    {response}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <li>How likely are you to recommend this app to a friend?</li>
            <div className="alignLeft">
              {question3Responses.map((response, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name="radioOp"
                    onChange={() => setQuestion3Response(response)}
                  />
                  {response}
                </div>
              ))}
            </div>
          </div>
        </ol>
        <div className="center2">
          <p>Additional Notes (Optional):</p>
          <textarea
            onChange={(evnt) => setResponseNotes(evnt.target.value)}
            name="emergencydetails"
            cols="40"
            rows="3"
            value={responseNotes}
          ></textarea>
        </div>
        <br></br>
        <button type="submit" className="btn center3">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Survey;
