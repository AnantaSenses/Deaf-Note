const Joi = require('joi');

// Validation schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Function to validate user registration input
const validateRegister = (data) => {
  const { error } = registerSchema.validate(data);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return { error: errorMessage };
  }
  return { value: data }; // Return the validated data if no error
};

// Function to validate user login input
const validateLogin = (data) => {
  const { error } = loginSchema.validate(data);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return { error: errorMessage };
  }
  return { value: data }; // Return the validated data if no error
};

module.exports = {
  validateRegister,
  validateLogin,
};
