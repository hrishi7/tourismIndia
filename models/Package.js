const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PackageSchema = new Schema({
  packageName: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  overview: {
    type: String
  },
  tourCost: {
    type: Number,
    required: true
  },
  places: {
    type: [String]
  },
  imagesUrl: {
    type: [String]
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  capacity: {
    type: Number
  },
  discountCost: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Package = mongoose.model("packages", PackageSchema);
