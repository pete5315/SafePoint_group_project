const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// Gets survey responses for the event id indicated
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const eventId = req.params.id;

  const queryText = `
    SELECT * FROM survey_responses
    WHERE "emergency_id" = $1;
  `; // SQL query to grab survey responses for a specified emergency

  pool
    .query(queryText, [eventId])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("ERROR in Survey Router", err);
    });
});

// Posts a new survey response for the event id indicated
router.post("/:id", rejectUnauthenticated, (req, res) => {
  console.log("--------------------", req.body);
  const queryText = `
          INSERT INTO survey_responses (
            "question1",
            "question2",
            "question3",
            "responseValues1",
            "responseValues2",
            "responseValues3",
            "responseNotes",
            "emergency_id"
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `; // SQL query to post a particular survey response

  const queryValues = [
    req.body.question1,
    req.body.question2,
    req.body.question3,
    req.body.question1Response,
    req.body.question2Response,
    req.body.question3Response,
    req.body.responseNotes,
    req.body.emergency_ID,
  ];

  pool
    .query(queryText, queryValues)
    .then((results) => {
      console.log(results);
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("ERROR in Survey Router", err);
    });
});

module.exports = router;
