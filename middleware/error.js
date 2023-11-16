const winston = require('winston');

// Create and configure the logger outside of the middleware
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'info' })
  ]
});

// Define the error-handling middleware
const errorHandler = function(err, req, res, next) {
  // Log the error using Winston
  logger.error(err.message, err);

  // Respond to the client
  res.status(500).send('Something failed.');
};

// Export the middleware
module.exports = errorHandler;
