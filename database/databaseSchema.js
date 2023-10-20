const mongoose = require('mongoose');

class CourseClass {
  constructor() {
    this.name = { type: String, required: true, trim: true };
    this.author = { type: String, required: true, trim: true };
    this.tags = { type: Array, validate: { validator: Array.isArray, message: 'Tags should be an array.' } };
    this.date = { type: Date, default: Date.now };
    this.isPublished = { type: Boolean, default: false };
  }
}

const CourseSchema = new mongoose.Schema(new CourseClass());
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
