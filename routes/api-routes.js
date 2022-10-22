// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the days Available
  app.get("/api/getDays/", function (req, res) {
    db.Day.findAll({}).then(function (dbDay) {
      res.json(dbDay);
    });
  });

  // POST route for saving a new post
  app.post("/api/Day", function (req, res) {
    console.log(req.body);
    // Check if day already exist??
    let request = req.body;

    console.log(request);

    for (const property in request) {
      if (request[property] == "on") {
        request[property] = 1;
      }
    }

    db.Day.create({
      weight: req.body.weight,
    }).then(function (dbPost) {
      db.Meal.create({
        title: req.body.title,
        food: req.body.food,
        time: req.body.time,
        bloating: req.body.bloating,
        headache: req.body.headache,
        itchiness: req.body.itchiness,
        reflux: req.body.reflux,
        redness: req.body.redness,
        noseRunning: req.body.noseRunning,
        howLong: req.body.howLong,
        other: req.body.other,
      }).then(function (dbPost) {
        res.json(req.body);
      });
    });
  });
};
