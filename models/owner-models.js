const mongoose = require('mongoose');
const Joi = require('joi');
const dburl=process.env.DATABASE_URI || 'mongodb://localhost:27017/Owner';
mongoose.connect(dburl);
const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // simple email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
});

// Create a Mongoose model
const OwnerModel = mongoose.model('owner',ownerSchema);

// Step 2: Define Joi validation schema
const ownerValidationSchema = Joi.object({ //Joi.object({ })
  name: Joi.string()                       //NAME:JOI.STRING().MIN(6).MAXLENGHT(128).REQUIRED()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should be at least 3 characters long',
      'string.max': 'Name should not exceed 50 characters',
      'any.required': 'Name is required',
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } }) // Email validation
    .required()
    .messages({
      'string.base': 'Email must be a string', //
      'string.empty': 'Email cannot be empty',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,128}$')) // password complexity
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should be at least 6 characters long',
      'string.max': 'Password should not exceed 128 characters',
      'string.pattern.base': 'Password must only contain alphanumeric characters or special characters (!@#$%^&*)',
      'any.required': 'Password is required',
    }),
});

// Function to validate the owner using Joi
const validateOwner = (owner) => {
  return ownerValidationSchema.validate(owner);
};
// Export the model and validation function
module.exports = {OwnerModel, validateOwner};
