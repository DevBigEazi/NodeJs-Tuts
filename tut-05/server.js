const logEvents = require("./logEvents");

// const EventEmitter = require("events");
// class MyEmitter extends EventEmitter {}

// // initialize events object
// const myEmitter = new MyEmitter();

// // add event listener
// myEmitter.on("log", (msg) => logEvents(msg));

// setTimeout(() => {
//   myEmitter.emit("log", "event emitted");
// }, 2000);

const { EventEmitter } = require("node:events");

// initializing event object
const emitter = new EventEmitter();
emitter.on("log", (msg) => logEvents(msg));

// console.log(myEmitter.listeners("log"));
setTimeout(() => {
  emitter.emit("log", "emmitted");
}, 3000);
