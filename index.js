const errorHandler = require('./middleware/error');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const users = require('./routes/users');
const auth = require('./routes/auth');

const express = require('express');
const run = require('./database/databaseConnect');
const app = express();


run();
app.use(express.json());
app.use(logger);
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(errorHandler);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port: ${port}`));         
