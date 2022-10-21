
const express = require("express");
// Set Handlebars.
const exphbs = require("express-handlebars");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static(__dirname + '/public'));

// Routes
app.get("/", function(req, res) {
    res.render("index");
  });
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});