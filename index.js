const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const users = require('./routes/users');
const express = require('express');
const run = require('./database/databaseConnect');
const app = express();

run();
app.use(express.json());
app.use(helmet());
app.use(logger);
app.use('/api/courses', courses);
app.use('/api/users', users);


// app.get('/test', (req, res) => {
//     res.send('Test route');
//   });

//####### SETUP ##########

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     console.log('Morgan is enabled...')
// }

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port: ${port}`));         
