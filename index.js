const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const users = require('./routes/users');
const auth = require('./routes/auth');

const express = require('express');
const run = require('./database/databaseConnect');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
run();
app.use(express.json());
app.use(helmet());
app.use(logger);
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port: ${port}`));         
