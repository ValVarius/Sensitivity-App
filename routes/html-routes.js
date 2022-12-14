// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/form.html"));
  });

  app.get("/calendar", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/date.html"));
  });

  app.get("/card", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/day.html"));
  });
  

};