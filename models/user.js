const mongoose = require('mongoose');
const Joi = require('joi');

// Function to create Mongoose schema
function createUserSchema() {
  return new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    email: { 
      type: String, 
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      trim: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    }
  });
}

// Create a Mongoose model using the schema returned by the function
const User = mongoose.model('User', createUserSchema());

// Joi validation
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).trim().required(),
    email: Joi.string().min(5).max(255).trim().required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
