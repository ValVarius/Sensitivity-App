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
    // get date
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let output =
      d.getFullYear() +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      (day < 10 ? "0" : "") +
      day;

    let request = req.body;
    console.log(request);
    // make switches into boolean
    for (const property in request) {
      if (request[property] == "on") {
        request[property] = 1;
      }
    }
    db.Meal.create({
      date: output,
      weight: req.body.weight,
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
      other: req.body.other
    }).then(function (dbMeal) {
      res.json(dbMeal);
    });



  });
};
