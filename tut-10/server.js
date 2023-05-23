const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 8500;

// custom middleware
app.use(logger);

app.use(cors(corsOptions));

// Built in midddleware to handle urlencoded data i.e form data :
// content-type: application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false }));

//Built in midddleware to handle json data
app.use(express.json());

// Middleware to serve static files
// app.use(express.static(path.join(__dirname, "/public"))); // tell the express to use the public files by default

app.use("/", express.static(path.join(__dirname, "/public"))); // tell the express to use the public files by default

// routes
app.use("/", require("./routes/root"));
//api routes
app.use("/employees", require("./routes/api/employees"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

// app.use and app.all different
// with app.use we can have somthing like this app.use('/) but we can not apply regex and it is more likely to be used for middleware. now apply regex in the latest version
// app.all doesn't really require / (forward slash  is optional) and it usage means it will apply to all http request methods. we can also define conditions for or customize error 404 with .all
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ err: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
