const mongoose = require('mongoose');

// Define the Schema
const PortSchema = new mongoose.Schema({
  name: {
	type: String,
	required: true,  // The 'name' field is required
  },
  description: {
	type: String,
	required: true,  // The 'description' field is required
  },
  image: 
	{
	  type: String,  // Only store the filename (as a string)
	  required: true, // Filename is required
	},

}, {
  timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields
});
// Create and export the model
const Portfolio = mongoose.model('port', PortSchema);
module.exports = Portfolio;
