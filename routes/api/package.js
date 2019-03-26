const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load models
const User = require("../../models/User");
const Package = require("../../models/Package");

//aws s3 packages
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

// @route   GET api/package/test
// @desc    Tests package route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "package Works" }));

//profile image upload start
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET
});

// Multiple File Uploads ( max 4 )
const multiplePlaceImage = multer({
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
  limits: { fileSize: 5000000 }, // In bytes: 5000000 bytes = 5 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("multipleImage", 8);
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

// @type    POST
//@route    /api/package/
// @desc    route for SAVING data for package
// @access  PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    multiplePlaceImage(req, res, error => {
      if (error) {
        res.json({ error: error });
      } else {
        //here we can get req.body
        User.find({ email: req.user.email }).then(result => {
          if (result) {
            if (result.admin === "false") {
              res.json({ message: "You are not authorized to do this task" });
            } else {
              //save here
              const packageDetails = {};
              // Skills - Spilt into array
              if (typeof req.body.places !== "undefined") {
                packageDetails.places = req.body.places.split(",");
              }
              if (req.body.state) packageDetails.state = req.body.state;
              if (req.body.city) packageDetails.city = req.body.city;
              if (req.body.country) packageDetails.country = req.body.country;
              if (req.body.capacity)
                packageDetails.capacity = req.body.capacity;
              if (req.body.discountCost)
                packageDetails.discountCost = req.body.discountCost;
              if (req.body.tourCost)
                packageDetails.tourCost = req.body.tourCost;
              if (req.body.packageName)
                packageDetails.packageName = req.body.packageName;
              if (req.body.startDate)
                packageDetails.startDate = req.body.startDate;
              if (req.body.endDate) packageDetails.endDate = req.body.endDate;
              if (req.body.overview)
                packageDetails.overview = req.body.overview;

              //image saves
              if (req.files !== undefined) {
                let fileArray = req.files,
                  fileLocation;

                const galleryImgLocationArray = [];
                for (let i = 0; i < fileArray.length; i++) {
                  fileLocation = fileArray[i].location;
                  galleryImgLocationArray.push(fileLocation);
                }
                packageDetails.imagesUrl = galleryImgLocationArray;
              }
              const newPackage = new Package({
                packageName: packageDetails.packageName,
                startDate: packageDetails.startDate,
                endDate: packageDetails.endDate,
                overview: packageDetails.overview,
                tourCost: packageDetails.tourCost,
                places: packageDetails.places,
                imagesUrl: packageDetails.imagesUrl,
                state: packageDetails.state,
                city: packageDetails.city,
                country: packageDetails.country,
                capacity: packageDetails.capacity,
                discountCost: packageDetails.discountCost
              });
              Package.findOne({ packageName: req.body.packageName }).then(
                packageResult => {
                  if (packageResult) {
                    res.json({
                      message: "Already Exist Try another package name"
                    });
                  } else {
                    newPackage
                      .save()
                      .then(package =>
                        res.json({ message: "Saved Successfully" })
                      )
                      .catch(err => console.log(err));
                  }
                }
              );
            }
          }
        });
      }
    });
  }
);

// @type    POST
//@route    /api/package/:id
// @desc    route for UPDATING data for package
// @access  PRIVATE

///

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    multiplePlaceImage(req, res, error => {
      if (error) {
        res.json({ error: error });
      } else {
        //here we can get req.body
        User.find({ email: req.user.email }).then(result => {
          if (result) {
            if (result.admin === "false") {
              res.json({ message: "You are not authorized to do this task" });
            } else {
              //save here
              const packageDetails = {};
              // Skills - Spilt into array
              if (typeof req.body.places !== "undefined") {
                packageDetails.places = req.body.places.split(",");
              }
              if (req.body.state) packageDetails.state = req.body.state;
              if (req.body.city) packageDetails.city = req.body.city;
              if (req.body.country) packageDetails.country = req.body.country;
              if (req.body.capacity)
                packageDetails.capacity = req.body.capacity;
              if (req.body.discountCost)
                packageDetails.discountCost = req.body.discountCost;
              if (req.body.tourCost)
                packageDetails.tourCost = req.body.tourCost;
              if (req.body.packageName)
                packageDetails.packageName = req.body.packageName;
              if (req.body.startDate)
                packageDetails.startDate = req.body.startDate;
              if (req.body.endDate) packageDetails.endDate = req.body.endDate;
              if (req.body.overview)
                packageDetails.overview = req.body.overview;

              //image saves
              if (req.files !== undefined) {
                let fileArray = req.files,
                  fileLocation;

                const galleryImgLocationArray = [];
                for (let i = 0; i < fileArray.length; i++) {
                  fileLocation = fileArray[i].location;
                  galleryImgLocationArray.push(fileLocation);
                }
                packageDetails.imagesUrl = galleryImgLocationArray;
              }

              Package.findById(req.params.id).then(packageResult => {
                if (packageResult) {
                  // Update
                  Package.findOneAndUpdate(
                    req.params.id,
                    { $set: packageDetails },
                    { new: true }
                  ).then(packageDetails =>
                    res.json({ message: "Updated Successfully!!" })
                  );
                } else {
                  res.json({ msg: "not able not update data" });
                }
              });
            }
          }
        });
      }
    });
  }
);

///

// @type    GET
//@route    /api/package/
// @desc    route for getting all packages
// @access  PRIVATE

router.get("/", (req, res) => {
  Package.find()
    .sort({ date: -1 })
    .then(PackageResult => res.json(PackageResult))
    .catch(err =>
      res.status(404).json({ NoProduct: "No Product Found" + err })
    );
});

// @type    GET
//@route    /api/package/:id
// @desc    route for getting one package by its id
// @access  PRIVATE

router.get("/:id", (req, res) => {
  Package.findOne({ _id: req.params.id })
    .then(PackageResult => res.json(PackageResult))
    .catch(err =>
      res.status(404).json({ NoProduct: "No Product Found" + err })
    );
});

// @type    DELETE
//@route    /api/package/:id
// @desc    route for deleeting one package by its id
// @access  PRIVATE

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ email: req.user.email }).then(user => {
      if (user) {
        if (user.admin === "false") {
          res.json({ message: "You are not an admin sorry" });
        } else {
          Package.findOneAndDelete({ _id: req.params.id })
            .then(PackageResult =>
              res.json({ message: "Package is deleted Successfully " })
            )
            .catch(err =>
              res.status(404).json({ NoProduct: "No Product Found" + err })
            );
        }
      }
    });
  }
);

// @type    GET
//@route    /api/package/PackageName/:name
// @desc    route for getting one package by its name
// @access  PRIVATE

router.get("/PackageName/:name", (req, res) => {
  Package.findOne({ packageName: req.params.name })
    .then(PackageResult => res.json(PackageResult))
    .catch(err =>
      res.status(404).json({ NoProduct: "adfadsfasdfa Product Found" + err })
    );
});

//search by placename and city

// @type    GET
//@route    /api/package/:place/:city
// @desc    route for getting all packages
// @access  PRIVATE

router.get("/:state/:city", (req, res) => {
  Package.find({
    $or: [{ state: req.params.state }, { city: req.params.city }]
  })
    .sort({ date: -1 })
    .then(PackageResult => res.json(PackageResult))
    .catch(err =>
      res.status(404).json({ NoProduct: "No Product Found" + err })
    );
});

module.exports = router;
