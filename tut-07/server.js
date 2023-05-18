const express = require("express");
const app = express();
const path = require("path");

const { logger } = require("./middleware/logEvents");

const PORT = process.env.PORT || 8500;

// custom middleware
app.use(logger);

// Built in midddleware to handle urlencoded data i.e form data :
// content-type: application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false }));

//Built in midddleware to handle json data
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page.html", (req, res) => {
  res.redirect(301, "/new-page.html"); // 302 by default
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404);
});

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
