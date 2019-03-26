const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load models
const User = require("../../models/User");
const Offer = require("../../models/Offer");
const Package = require("../../models/Package");

// @route   GET api/offer/test
// @desc    Tests offer route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "offer Works" }));

// @type    POST
//@route    /api/offer/
// @desc    route for SAVING data for offer
// @access  PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ email: req.user.email }).then(
      (result = async () => {
        if (result) {
          if (result.admin === "false") {
            res.json({ message: "You are not authorized to do this task" });
          } else {
            //save here

            //object of offer
            const offer = new Offer({
              packageName: req.body.packageName ? req.body.packageName : "",
              offerTitle: req.body.offerTitle ? req.body.offerTitle : "",
              originalCost: req.body.originalCost ? req.body.originalCost : "",
              offerPercent: req.body.offerPercent ? req.body.offerPercent : "",
              offerValidityStartOn: req.body.offerValidityStartOn
                ? req.body.offerValidityStartOn
                : "",
              offerValidityEndOn: req.body.offerValidityEndOn
                ? req.body.offerValidityEndOn
                : ""
            });

            //check if the offer on the same package is already exist between that period if it hen don't save it just give error message at frontend
            //otherwise save

            const result = await Offer.find({
              packageName: req.body.packageName
            });

            if (result.length !== 0) {
              result.forEach(one => {
                let givenStart = Date.parse(req.body.offerValidityStartOn);
                let givenEnd = Date.parse(req.body.offerValidityEndOn);
                let resultStart = Date.parse(one.offerValidityStartOn);
                let resultEnd = Date.parse(one.offerValidityEndOn);

                if (givenStart > resultEnd || givenEnd < resultStart) {
                  /* if (req.body.offerTitle === one.offerTitle) {
                    res.json({
                      message: "Please Choose Different Offer Title"
                    });
                  } else {*/
                  offer.save().then(result => {
                    const packageValue = {};
                    packageValue.discountCost =
                      (req.body.originalCost * req.body.offerPercent) / 100;
                    //then update package table package
                    //findoneandupdate in package update the discoutCost column here
                    Package.findOneAndUpdate(
                      { packageName: req.body.packageName },
                      { $set: packageValue },
                      { new: true }
                    ).then(result => res.json(result));
                    //res.json({ message: "TourCost is updated successfully!!" })
                  });
                  //}
                } else {
                  res.json({
                    message:
                      "Offer already available for that period plz try another dates/ Different title"
                  });
                }
              });
            } else {
              offer.save().then(result => {
                const packageValue = {};
                packageValue.discountCost =
                  (req.body.originalCost * req.body.offerPercent) / 100;
                //then update package table package
                //findoneandupdate in package update the discoutCost column here
                Package.findOneAndUpdate(
                  { packageName: req.body.packageName },
                  { $set: packageValue },
                  { new: true }
                ).then(result => res.json(result));
                //res.json({ message: "TourCost is updated successfully!!" })
              });
            }
          }
        }
      })
    );
  }
);

// @type    GET
//@route    /api/offer/
// @desc    route for getting all offeres
// @access  PRIVATE

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Offer.find()
      .sort({ date: -1 })
      .then(offerResult => res.json(offerResult))
      .catch(err =>
        res.status(404).json({ NoProduct: "No Product Found" + err })
      );
  }
);

// @type    GET
//@route    /api/offer/:packageName
// @desc    route for getting one offer by its Package Name
// @access  PRIVATE

router.get("/:packageName", (req, res) => {
  Offer.findOne({ packageName: req.params.packageName })
    .then(offerResult => res.json(offerResult))
    .catch(err =>
      res.status(404).json({ NoProduct: "No Product Found" + err })
    );
});

module.exports = router;
