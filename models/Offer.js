const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OfferSchema = new Schema({
  packageName: {
    type: String,
    required: true
  },
  offerTitle: {
    type: String,
    required: true
  },
  originalCost: {
    type: String,
    required: true
  },
  offerPercent: {
    type: Number,
    required: true
  },
  offerValidityStartOn: {
    type: String,
    required: true
  },
  offerValidityEndOn: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Offer = mongoose.model("Offers", OfferSchema);
