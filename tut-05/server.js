const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { EventEmitter } = require("node:events");

const logEvents = require("./logEvents");

// initializing event object
const emitter = new EventEmitter();
emitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );

    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });

    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    emitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  emitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  let extension = path.extname(req.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // make url extension not require in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    // 301 redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        // serve a 404 page
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`server running at port ${PORT}`));

// emitter.on("log", (msg) => logEvents(msg));

// // console.log(myEmitter.listeners("log"));
// setTimeout(() => {
//   emitter.emit("log", "emmitted");
// }, 3000);

// const EventEmitter = require("events");
// class MyEmitter extends EventEmitter {}

// // initialize events object
// const myEmitter = new MyEmitter();

// // add event listener
// myEmitter.on("log", (msg) => logEvents(msg));

// setTimeout(() => {
//   myEmitter.emit("log", "event emitted");
// }, 2000);

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//       let hpath;

//       if (req.url === "/" || req.url === "index.html") {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/html");
//         hpath = path.join(__dirname, "views", "index.html");
//         fs.readFile(hpath, { encoding: "utf8" }, (err, data) => {
//           if (err) throw err;
//           res.end(data);
//         });
//       }
//   });

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//     let urlPath;
//     switch (req.url) {
//       case "/":
//         res.statusCode = 200;
//         urlPath = path.join(__dirname, "views", "index.html");
//         fs.readFile(urlPath, "utf8", (err, data) => {
//           res.end(data);
//         });
//         break;
//       default:
//         break;
//     }
//   });
