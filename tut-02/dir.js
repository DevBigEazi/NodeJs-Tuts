const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, "another"))) {
  fs.mkdir(path.join(__dirname, "another"), (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
}

// if (fs.existsSync("./new/")) {
//   fs.rmdir("./new/", (err) => {
//     if (err) throw err;
//     console.log("Directory deleted successfully");
//   });
// }
