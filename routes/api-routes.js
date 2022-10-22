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
  // GET route for getting all of the Meals with a date Available
  app.get("/api/getMeals/:date", function (req, res) {
    console.log(req.params);
    db.Meal.findAll({
      where: {
        date: req.params.date
      }
    }).then(function (dbMeal) {
      res.json(dbMeal);
    });
  });

// GET route for getting all of the Meals
  app.get("/api/Meal", function(req, res) {

    db.Meal.findAll({}).then(function(dbMeal) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbMeal);
    });
  });

  // POST route for saving a new post
  app.post("/api/Meal", function (req, res) {
    // get date
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let output =
      d.getFullYear() +
      "|" +
      (month < 10 ? "0" : "") +
      month +
      "|" +
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
      weight: req.body.weight ? req.body.weight : 0,
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
