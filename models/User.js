const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  address: {
    type: String
  },
  nationality: {
    type: String
  },
  gender: {
    type: String
  },
  dpUrl: {
    type: String
  },
  viewPass: { type: String },
  admin: { type: String, default: false },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
