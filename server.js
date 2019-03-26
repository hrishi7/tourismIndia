const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

require("dotenv").config();

const users = require("./routes/api/users");
const payment = require("./routes/api/payment");
const profile = require("./routes/api/profile");
const package = require("./routes/api/package");
const offer = require("./routes/api/offer");
const booklist = require("./routes/api/booklist");
const resetPassword = require("./routes/api/resetPassword");

const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport Config
require("./config/passport.js")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/package", package);
app.use("/api/payment", payment);
app.use("/api/offer", offer);
app.use("/api/booklist", booklist);
app.use("/api/resetPassword", resetPassword);

//this is for production time
//server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
