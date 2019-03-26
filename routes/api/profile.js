const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//aws s3 packages
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile/
// @desc    get profile data
// @access  Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.user.email }).then(user => {
      if (!user) {
        res.json({ msg: "not get profile data" });
      } else {
        res.json(user);
      }
    });
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.nationality) profileFields.nationality = req.body.nationality;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.admin) profileFields.admin = req.body.admin;

    User.findOne({ email: req.user.email }).then(user => {
      if (user) {
        // Update
        User.findOneAndUpdate(
          { email: req.user.email },
          { $set: profileFields },
          { new: true }
        ).then(user => res.json(user));
      } else {
        res.json({ msg: "not able not update data" });
      }
    });
  }
);

//profile image upload start
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET
});

//Singe profile image upload

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 5000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("profileImage");

// getExtension of file by this function
function getExtension(filename) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

//checkfile type of input function
function checkFileType(file, cb) {
  const ext = getExtension(file.originalname);
  switch (ext.toLowerCase()) {
    case "jpeg":
    case "jpg":
    case "png":
    case "gif":
      return cb(null, true);
  }
  cb("Error: Images Only!");
}

// @route   POST api/profile/image
// @desc    post profile image
// @access  Private

router.post(
  "/image",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileImgUpload(req, res, error => {
      if (error) {
        res.json({ error: error });
      } else {
        //here we can get req.body
        const userDp = {};

        //end of getting values

        // If File not found then dont store anything
        if (req.file !== undefined) userDp.dpUrl = req.file.location;
        // Save the file name into database into profile model

        User.findOne({ email: req.user.email }).then(user => {
          if (user) {
            // Update
            User.findOneAndUpdate(
              { email: req.user.email },
              { $set: userDp },
              { new: true }
            ).then(user => res.json(user));
          } else {
            res.json({ msg: "not able not update data" });
          }
        });
      }
    });
  }
);

//profile image upload end

module.exports = router;
