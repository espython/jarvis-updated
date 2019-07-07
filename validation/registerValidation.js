import Validator from 'validator';
import isEmpty from 'is-empty';

/**
 *  The Validation Function
 */
function ValidateRegisterInputs(data) {
  const errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Name check
  if (Validator.isEmpty(data.name)) {
    errors.name = 'your Name is Required';
  }
  // Email Checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'your Email Field is Required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // Password Check
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  // Password Confirmation
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords mus match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default ValidateRegisterInputs;
