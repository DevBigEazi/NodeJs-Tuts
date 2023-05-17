const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

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

//routes handlers
// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("attemted to load hello page 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("attemted to load hello page 1");
//     next();
//   },
//   (req, res) => {
//     res.send("Finished");
//   }
// );

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("finished");
};

app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404);
});

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
