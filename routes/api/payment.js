const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load payment model
const Payment = require("../../models/Payment");

//payment gateway
const Insta = require("instamojo-nodejs");
const url = require("url");
const API_KEY = process.env.INSTAMOJO_API_KEY;
const API_TOKEN = process.env.INSTAMOJO_API_TOKEN;

// @route   GET api/payment/test
// @desc    Tests payment route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "payment Works" }));

// @route   POST api/payment
// @desc    Post payment request with payment details in this route
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Insta.setKeys(API_KEY, API_TOKEN);

    const data = new Insta.PaymentData();

    Insta.isSandboxMode(true); //this is used to run app in test mode

    data.purpose = req.body.purpose;
    data.amount = req.body.amount;
    data.buyer_name = req.body.buyer_name;
    data.redirect_url = req.body.redirect_url;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.send_email = false;
    data.webhook = "http://www.example.com/webhook/";
    data.send_sms = false;
    data.allow_repeated_payments = false;

    //here actually creating the payment
    Insta.createPayment(data, function(error, response) {
      if (error) {
        // some error
      } else {
        // Payment redirection link at response.payment_request.longurl
        const responseData = JSON.parse(response);
        const redirectUrl = responseData.payment_request.longurl;
        res.status(200).json(redirectUrl);
        //while calling to this api from react
        //after axios.post window.location.href = res.data
      }
    });
  }
);

// @route   GET api/payment/callback/
// @desc    callback url route for instamojo api
// @access  public

router.get("/callback/:amt/:pid/:email/:bid", async (req, res) => {
  if (req.user !== null) {
    let url_parts = url.parse(req.url, true),
      responseData = url_parts.query;

    if (responseData.payment_id) {
      //successfull payment
      const dateObj = new Date();
      const date = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      //now get all datas from url and insert into payment details table
      const obj = new Payment({
        packageId: req.params.pid,
        paymentId: responseData.payment_id,
        paymentRequestId: responseData.payment_request_id,
        userEmail: req.params.email,
        paymentDate: `${date}/${month}/${year}`,
        paymentAmount: req.params.amt
      });

      await obj
        .save()
        .then(result => {})
        .catch(errors => console.log(errors));

      // Redirect the user to payment complete page.
      return res.redirect(
        `http://localhost:3000/payment-complete/${req.params.bid}`
      );
    }
  }
});

// @type    GET
// @route   /api/payment/:id
// @desc    route for getting one payment by package id
// @access  PRIVATE

router.get("/:id", (req, res) => {
  Payment.findOne({ packageId: req.params.id })
    .then(PaymentResult => res.json(PaymentResult))
    .catch(err =>
      res.status(404).json({ NoPayment: "No Payment Found" + err })
    );
});

// @type    GET
// @route   /api/payment/
// @desc    route for getting all payments
// @access  PRIVATE

router.get("/",passport.authenticate("jwt", { session: false }), (req, res) => {
  User.find({email: req.user.email})
  .then(user=>{
    if(user){
      if(user.admin === 'false'){
        res.json({message:"You are not an admin sorry"})
      }else{
        Payment.find({})
        .then(PaymentResult => res.json(PaymentResult))
        .catch(err =>
          res.status(404).json({ NoPayment: "No Payment Found" + err })
        );
      }
    }
  })
  
});

//updated api
// |
//\ /

// @type    GET
// @route   /api/payment/search/:id
// @desc    route for getting one payment by payment id
// @access  PRIVATE

router.get("/search/:id",passport.authenticate("jwt", { session: false }), async (req, res) => {
  User.find({email: req.user.email})
  .then(user=>{
    if(user){
      if(user.admin === 'false'){
        res.json({message:"You are not an admin sorry"})
      }else{
        const data = await Payment.find({
          paymentId: new RegExp(req.params.id, "i")
        });
        res.json(data);
      }
    }
  })
  
});

module.exports = router;
