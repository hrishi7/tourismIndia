const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.address = !isEmpty(data.address) ? data.address : "";
  data.nationality = !isEmpty(data.nationality) ? data.nationality : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  if (Validator.isEmpty(data.nationality)) {
    errors.nationality = "Nationality field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
