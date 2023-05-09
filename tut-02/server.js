console.log("Hello world!");

// To deal with file system, we have to import the fs module
const fs = require("fs");
const path = require("path");

// To read file, we have to make use of readFile method, which will take in two params. The first is going to be the file directories of the file and the second is going to be the call back function with err and data as the two params.

// Reading File.
//Hardcoding the path.
fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) throw err; // to throw error
  console.log(data); // with this, it is going to present a buffer data for us, which is not actually what we want.

  //   console.log(data.toString()); // with this, it is going to present the real data for us.

  // we can actually define the encoding('utf8') instead of to string and that is gonna be the second argument for the readFile
});

// file system is asynchronous in nature, for example when it is processing the above code and it is going to continue running the codes that follows.

console.log("Synchronous");

// Instead of hardcoding the path, there is a better way which is to use the path module.

fs.readFile(path.join(__dirname, "files", "soft.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Wtiting File
// here the second parameter is gonna be the message we are writing and for the third parameter which is a callback function, we only need error as the only parameter.
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Hi, you are getting a reply.",
  (err) => {
    if (err) throw err;
    console.log("Writing Completed");

    // Updating a file
    // To do this, we will need to use appendFile method. It will update file and as well as creating new file if the file doesnt exist.we have to place this inside the call back of the file we want to update.
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      `\n\n So can we update this`,
      (err) => {
        if (err) throw err;
        console.log("Append Completed");

        // we can rename the files by having rename method used inside the appFile callback. This will make the code look like callback hell
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("Rename Completed");
          }
        );
      }
    );
  }
);

const fsPromise = require("fs/promises");
const path = require("path");

const fsOperations = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, "files", "lorem.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromise.unlink(path.join(__dirname, "files", "lorem.txt"));

    await fsPromise.writeFile(path.join(__dirname, "files", "write.txt"), data);

    await fsPromise.appendFile(
      path.join(__dirname, "files", "write.txt"),
      "\n\n This file has been updated successfully"
    );
    await fsPromise.rename(
      path.join(__dirname, "files", "write.txt"),
      path.join(__dirname, "files", "renameCompleted.txt"),
      "The data has been renamed successfully"
    );

    const newData = await fsPromise.readFile(
      path.join(__dirname, "files", "renameCompleted.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fsOperations();

// according to nodjs docs, we can throw the error with the following syntax
process.on("uncaughtException", (err) => {
  console.error(`"There was an error processing the data: " ${err}`);
  process.exit(1);
});
