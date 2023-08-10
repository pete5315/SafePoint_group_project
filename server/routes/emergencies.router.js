const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// Get all emergencies
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT emergencies.id, injuries.type, timecreated, status, user_id, locations.name AS location 
  FROM emergencies
  JOIN locations ON emergencies.location_id=locations.id
  JOIN injuries ON emergencies.type = injuries.id;
  `;
  pool
    .query(queryText) //SQL query
    .then((results) => {
      console.log("results.rows", results.rows);
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Gets emergency alerts for the event id indicated
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT emergencies.id, injuries.type, timecreated, status, emergencies.event_id, admin_notes, user_id, locations.name AS location 
    FROM emergencies
    JOIN locations ON emergencies.location_id=locations.id
    JOIN injuries ON emergencies.type = injuries.id
    WHERE emergencies.event_id=$1
    ORDER BY timecreated DESC;
  `;
  pool
    .query(queryText, [req.params.id]) //SQL query
    .then((results) => {
      console.log("results.rows", results.rows);
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Get the emergency with the indicated ID
router.get("/emergency/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT emergencies.id, injuries.type, injuries.id AS injuryID, timecreated, status, user_id, locations.name AS location, admin_notes
    FROM emergencies
    JOIN locations ON emergencies.location_id=locations.id
    JOIN injuries ON emergencies.type = injuries.id
    WHERE emergencies.id=$1;
  `;
  pool
    .query(queryText, [req.params.id]) //SQL query
    .then((results) => {
      console.log("results.rows", results.rows);
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Posts a new emergency alert for the event and user id indicated
router.post("/:event/:id", rejectUnauthenticated, (req, res) => {
  //scrubbing our sql query
  const queryText = `INSERT INTO emergencies (event_id, user_id, status)
  VALUES ($1, $2, $3) returning id;`;
  pool
    .query(queryText, [req.params.event, req.params.id, 3]) //SQL query '3' defaults the emergency status to red

    .then((results) => {
      //send the id of the created emergency as an object (can't send numbers on their own so we send the object)
      res.send(results.rows[0]);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Edits an emergency alert for the id indicated
router.put("/:id", rejectUnauthenticated, (req, res) => {
  // initialize queryText and inputs variable so they can be updated below
  let queryText = ``,
    inputs = [];
  // check if only type needs to be updated--user request
  // check if the whole row needs to be updated--this is the admin request
  if (req.user.isVenue) {
    queryText = `UPDATE emergencies 
                      SET emergencies.type = $1, location = $2, status = $3
                      WHERE id = $4;`;
    inputs = [
      req.body.injuryID,
      req.body.location,
      req.body.status,
      req.params.id,
    ];
  } else if (req.body.type) { //check if the type needs to be updated--user request
    queryText = `UPDATE emergencies 
                      SET type = $1
                      WHERE id = $2;`;
    inputs = [req.body.type, req.params.id];
  }
  // check if only location needs to be updated--user request
  if (req.body.location) {
    queryText = `UPDATE emergencies 
                      SET location_id = $1
                      WHERE id = $2;`;
    inputs = [`${req.body.location}`, req.params.id];
  }
  pool
    .query(queryText, inputs) //SQL query
    .then((results) => {
      //send the updated event as an object
      res.send(results.rows[0]);
    })

    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Updating the Status of the emergency with the indicated ID
router.put("/emergency/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    UPDATE "emergencies" SET "status" = $1, "admin_notes" = $2
    WHERE "id" = $3;
  `;
  const values = [req.body.statusValue, req.body.adminNotes, req.params.id];
  pool
    .query(queryText, values) //SQL query
    .then((results) => {
      console.log("results.rows", results.rows);
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Deletes an emergency alert for the id indicated
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    DELETE FROM "emergencies"
    WHERE "id" = $1;
  `;
  pool
    .query(queryText, [req.params.id]) //SQL query
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

module.exports = router;
