const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 8500;

// custom middleware
app.use(logger);

// Cross Oringin Resources Sharing
const allowlist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:3000",
  "http://localhost:8500",
];

// cors configuration w/ dynamic origin
const corsOptions = {
  origin: (origin, callback) => {
    if (allowlist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Built in midddleware to handle urlencoded data i.e form data :
// content-type: application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false }));

//Built in midddleware to handle json data
app.use(express.json());

// Middleware to serve static files
// app.use(express.static(path.join(__dirname, "/public"))); // tell the express to use the public files by default

app.use("/", express.static(path.join(__dirname, "/public"))); // tell the express to use the public files by default
app.use("/subdir", express.static(path.join(__dirname, "/public"))); // tell the express to allow subdir files to use the public files. we can do this in the html file

// routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));

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
