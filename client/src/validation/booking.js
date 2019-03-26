import Validator from "validator";
import isEmpty from "./is-empty";

export const validateBookingInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.aadharImage = !isEmpty(data.aadharImage) ? data.aadharImage : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile field is required";
  }

  if (Validator.isEmpty(data.aadharImage)) {
    errors.aadharImage = "Aadhar No. field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
