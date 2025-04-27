const Joi = require("joi");

const loginValidation = Joi.object({
  // name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports=loginValidation;