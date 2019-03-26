const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BooklistSchema = new Schema({
  packageName: {
    type: String,
    required: true
  },
  person: {
    type: [
      {
        name: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        mobile: {
          type: Number,
          required: true
        },
        aadharImage: {
          type: String,
          required: true
        }
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Booklist = mongoose.model("booklists", BooklistSchema);
