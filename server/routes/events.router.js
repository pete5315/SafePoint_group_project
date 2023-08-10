const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// Gets list of events for the admin user id indicated, skip incomplete events
router.get("/", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `SELECT * FROM events 
        WHERE name IS NOT NULL 
        AND venue IS NOT NULL 
        AND start_time IS NOT NULL 
        AND end_time IS NOT NULL 
        ORDER BY id;`
    )
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Gets list of events for the admin user id indicated, skip events that don't have a start or end time
router.get("/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `SELECT * FROM events
            WHERE admin_id=$1
            AND start_time IS NOT NULL
            AND end_time IS NOT NULL;
            `,
      [req.params.id]
    )
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Posts a new event for the id indicated
router.post("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "events" ("admin_id")
  VALUES ($1) RETURNING id;`;
  // these are the input values the was pluged in the event form.
  values = [req.params.id];
  pool
    .query(queryText, values) //SQL query
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Edits an event for the id indicated
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    let queryText = `
    UPDATE "events"
    SET ("name", "venue", "start_time", "end_time", "date") = 
    ($1 , $2, $3, $4, $5)
    WHERE "id" = $6;
  `;
    let values = [
      req.body.name,
      req.body.venue,
      req.body.start_time,
      req.body.end_time,
      req.body.date,
      req.body.eventID,
    ];
    await client.query(queryText, values); // SQL query for updating the event details
    await client.query( // SQL query for deleting the old locations
      `DELETE FROM locations
      WHERE event_id = $1;
    `,
      [req.body.eventID]
    );
    for (location of req.body.locations) {
      await client.query(
        `INSERT INTO locations
        (name, event_id)
        VALUES
        ($1, $2);  `,
        [location.name, req.body.eventID]
      ); // SQL query for adding the new locations
    }
    await client.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Error POST /api/events", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Deletes an event for the id indicated
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = ` 
    DELETE FROM events
    WHERE id = $1;
  `; // SQL query for deleting an event
  pool
    .query(sqlText, [req.params.id])
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

// Gets list of locations for the event id indicated
router.get("/locations/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT "name", id FROM locations WHERE event_id=$1;`, [
      req.params.id,
    ]) // SQL query for getting a list of locations for a particular event
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

module.exports = router;
