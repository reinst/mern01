const mongoose = require('mongoose');
const Joi = require('joi');

// Function to create Mongoose schema
function createCourseSchema() {
  return new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    author: { 
      type: String, 
      required: true, 
      trim: true 
    },
    tags: {
      type: Array,
      validate: {
        validator: Array.isArray,
        message: 'Tags should be an array.'
      }
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    isPublished: { 
      type: Boolean, 
      default: false 
    }
  });
}

// Create a Mongoose model using the schema returned by the function
const Course = mongoose.model('Course', createCourseSchema());

// Joi validation
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    tags: Joi.array(),
    date: Joi.date(),
    isPublished: Joi.boolean()
  });

  return schema.validate(course);
}

module.exports.Course = Course;
module.exports.validate = validateCourse;
