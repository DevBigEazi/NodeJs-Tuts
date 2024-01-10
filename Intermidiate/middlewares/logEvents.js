const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// log events 
const logEvents = async (message, logFile) => {
    const date$time = format(new Date(), 'yyyy-MM-dd\t\tHH:mm:ss');
    const logDetails = `${date$time}\t${uuid()}\t${message} \n`;
    console.log(logDetails);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logDetails);
    } catch (err) {
        console.log(err);
    }

};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "requestLogs.txt");
    console.log(`${req.method}\n ${req.path}`);
    next();
};

module.exports = { logEvents, logger };