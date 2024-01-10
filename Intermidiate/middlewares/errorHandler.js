const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errorLogs.txt');
    console.log(err.stack);
}

module.exports = errorHandler;