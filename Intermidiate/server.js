require('dotenv')
const path = require('path');
const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { logger } = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 8000;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(logger)

// app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/', require('./routes/admin').router);


//serve error page
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type("txt").send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));