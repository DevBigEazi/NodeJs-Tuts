console.log("Hello world!");
// console.log(global);

// const os = require("os");
// const path = require("path");

// console.log(os.type());
// console.log(os.homedir());
// console.log(os.version());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

// const math = require("./math");
// console.log(math.add(2, 500));

// destructring the the functions coming from the math.js file
const { add, substract, multiply, divide } = require("./math");
console.log(add(2, 500));
console.log(substract(2, 500));
console.log(multiply(2, 500));
console.log(divide(2, 500));
