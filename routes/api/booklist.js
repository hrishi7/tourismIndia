const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
//const validateBooklistInput = require("../../validation/booklist");

// Load User Model
const Booklist = require("../../models/Booklist");

// @route   GET api/booklist/
// @desc    get all booklist data
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booklist.find({})
      .sort({ date: -1 })
      .then(booklistResults => res.json(booklistResults))
      .catch(error => res.json(error));
  }
);

// @route   GET api/booklist
// @desc    get single booklist data by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booklist.findOne({ _id: req.params.id })
      .then(booklistResult => res.json(booklistResult))
      .catch(error => res.json(error));
  }
);

// @route   POST api/booklist
// @desc    insert booklist data
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Hello");
    let cap = req.body.person ? req.body.person.length : 0;

    const obj = new Booklist({
      packageName: req.body.packageName ? req.body.packageName : "",
      person: req.body.person ? req.body.person : []
    });
    obj
      .save()
      .then(async data => {
        //1.update capacity of package table
        const packageValue = {};

        const result = await Package.findOne({
          packageName: req.body.packageName
        });
        packageValue.capacity = result.capacity - cap;
        Package.findOneAndUpdate(
          { packageName: req.body.packageName },
          { $set: packageValue },
          { new: true }
        ).then(result => {});
        //2.return
        res.json(data._id);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
