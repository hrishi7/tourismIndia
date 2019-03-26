const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
  packageId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  paymentRequestId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  paymentDate: {
    type: String,
    required: true
  },
  paymentAmount: {
    type: Number,
    required: true
  }
});

module.exports = Payment = mongoose.model("payments", PaymentSchema);
