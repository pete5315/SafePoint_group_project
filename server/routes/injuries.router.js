const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/:id", rejectUnauthenticated, (req, res) => {
  console.log("THE user with the ID: :", req.params.id);
  const queryText = `
      SELECT * FROM "injuries";
    `;
  pool
    .query(queryText) //SQL query to grab the list of injuries
    .then((results) => {
      console.log("results.rows", results.rows);
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("SERVER SIDE ERROR", err);
    });
});

module.exports = router;
