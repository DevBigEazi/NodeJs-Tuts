// const fsPromise = require("fs").promises;
const fsPromise = require("fs/promises");
const path = require("path");

const fileOperations = async () => {
  try {
    // we only need the path and the second argument, no need for callbacks
    const data = await fsPromise.readFile(
      path.join(__dirname, "files", "encode.txt"),
      { encoding: "utf8" }
    );
    console.log(data);

    await fsPromise.unlink(path.join(__dirname, "files", "encode.txt"));

    await fsPromise.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromise.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nHello I have been updated"
    );
    await fsPromise.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseCompleted.txt"),
      data
    );

    const newData = await fsPromise.readFile(
      path.join(__dirname, "files", "promiseCompleted.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOperations();

// according to nodjs docs, we can throw the error with the following syntax
process.on("uncaughtException", (err) => {
  console.error(`"There was an error processing the data: " ${err}`);
  process.exit(1);
});
