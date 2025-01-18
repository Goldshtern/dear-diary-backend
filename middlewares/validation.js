const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.message("Invalid URL format");
  }
  return value;
};

const validateEmail = (value, helpers) => {
  if (!validator.isEmail(value)) {
    return helpers.message("Invalid email format");
  }
  return value;
};

const validateDiaryPage = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required().messages({
      "string.base": "Page title must be a string",
      "string.empty": "Page title is required",
      "string.min": "Page title must be at least 2 characters long",
      "string.max": "Page title must be at most 30 characters long",
    }),
    imageUrl: Joi.string().custom(validateUrl).required().messages({
      "string.base": "Image URL must be a string",
      "string.empty": "Image URL is required",
    }),
    text: Joi.string().min(2).max(300).required().messages({
      "string.base": "Text must be a string",
      "string.empty": "Text is required",
      "string.min": "Text must be at least 2 characters long",
      "string.max": "Text must be at most 300 characters long",
    }),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.base": "User name must be a string",
      "string.empty": "User name cannot be empty",
      "string.min": "User name must be at least 2 characters long",
      "string.max": "User name must be at most 30 characters long",
    }),
    avatarUrl: Joi.string().custom(validateUrl).required().messages({
      "string.base": "Avatar URL must be a string",
      "string.empty": "Avatar URL is required",
    }),
    email: Joi.string().custom(validateEmail).required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(validateEmail).required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    pageId: Joi.string().length(24).hex().required().messages({
      "string.base": "ID must be a string",
      "string.empty": "ID is required",
      "string.length": "ID must be 24 characters long",
      "string.hex": "ID must be a valid hexadecimal value",
    }),
  }),
});

module.exports = {
  validateDiaryPage,
  validateUserInfo,
  validateUserLogin,
  validateId,
};
