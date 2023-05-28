const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");

const PORT = process.env.PORT || 8500;

// custom middleware
app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

//Built in midddleware to handle json data
app.use(express.json());

// Middleware to serve static files
app.use("/", express.static(path.join(__dirname, "/public"))); // tell the express to use the public files by default

// middleware for cookies
app.use(cookieParser());

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

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
