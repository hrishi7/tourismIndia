const express = require("express");
const router = express.Router();

// Load Validation
//const validateBooklistInput = require("../../validation/booklist");

// Load User Model
const User = require("../../models/User");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route   GET api/resetPassword/
// @desc    send email with reset url
// @access  Public

router.post("/", async (req, res) => {
  if (req.body.email) {
    //if email is present only in req.body then send otp to mail id
    const email = req.body.email;
    const data = await User.find({ email: email });
    if (data.length === 0) {
      res.json({
        message: "Sorry This mail Id is not registered try a different one"
      });
    } else {
      //1.make a random number of 6 digit and send it to mail
      //2.and then verify it and then send response for
      let token = "ABCDEFGHIJKLMNOPQRSTUVWXYklmnopqrstuvwxyz0123456789";
      const adminmailId = "hrishikeshbaidya7@gmail.com";
      const UserEmail = req.body.email;
      token += Math.floor(100000 + Math.random() * 900000);
      token += Date.now() + 3600000;
      const subject = `Reset Password`;
      const message =
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://" +
        "localhost:3000/resetpassword" +
        "/reset/" +
        token +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n";

      const msg = {
        to: UserEmail,
        from: adminmailId,
        subject: subject,
        text: message,
        html: "<strong>" + message + "</strong>"
      };
      let r = "";
      const f1 = () => {
        r = sgMail.send(msg);
      };
      Promise.all[f1()];
      res.json({
        message: `Password Reset Url send successfully Please check your email.`
      });
    }
  } else {
    res.json({ message: "Please provide registered email address!" });
  }
});

// @route   GET api/resetPassword/editpassword
// @desc    use to update password
// @access  Public
router.post("/editpassword", (req, res) => {
  //2thing need to pass email and password
  const profileFields = {};
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      req.body.password = hash;
    });
  });
  if (req.body.password) profileFields.password = req.body.password;
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Update
      User.findOneAndUpdate(
        { email: req.body.email },
        { $set: profileFields },
        { new: true }
      ).then(user => {
        message: "Password updated Successfully Login Now!";
      });
    } else {
      res.json({ msg: "not able not update data" });
    }
  });
});

module.exports = router;
