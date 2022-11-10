// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the Meals with a date Available
  app.get("/api/getMeals/:date", function (req, res) {
    db.Meal.findAll({
      where: {
        date: req.params.date,
      },
    }).then(function (dbMeal) {
      res.json(dbMeal);
    });
  });

  // GET route for getting all of the Meals
  app.get("/api/Meal", function (req, res) {
    db.Meal.findAll({}).then(function (dbMeal) {
      res.json(dbMeal);
    });
  });

  // POST route for saving a new post
  app.post("/api/Meal", function (req, res) {
    // get date

    console.log(req.body);

    db.Meal.create({
      date: req.body.date,
      weight: req.body.weight ? req.body.weight : 0,
      title: req.body.title,
      food: req.body.food,
      time: req.body.time,
      bloating: req.body.bloating,
      headache: req.body.headache,
      gas: req.body.gas,
      itchiness: req.body.itchiness,
      reflux: req.body.reflux,
      redness: req.body.redness,
      noseRunning: req.body.noseRunning,
      howLong: req.body.howLong,
      other: req.body.other,
    }).then(function (dbMeal) {
      res.json(dbMeal);
    });
  });


  app.delete("/api/delete/:id", function(req, res) {
    db.Meal.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });
  app.delete("/api/deletetitledate", function(req, res) {

    console.log(req);
    db.Meal.destroy({
      where: {
        title: req.body.title,
        date: req.body.date
      }
    }).then(function(dbMeal) {
      console.log("DELETED??? ", dbMeal);
      res.json(dbMeal);
    });
  });

};
