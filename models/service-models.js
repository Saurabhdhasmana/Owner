const mongoose = require('mongoose');

// Define the Schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // The 'name' field is required
  },
  description: {
    type: String,
    required: true,  // The 'description' field is required
  },
  images: [
    {
      type: String,  // Only store the filename (as a string)
      required: true, // Filename is required
    },
  ],
}, {
  timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields
});

// Create and export the model
const Service = mongoose.model('service', ItemSchema);
module.exports = Service;
