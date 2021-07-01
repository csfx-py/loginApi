const Joi = require("joi");

const registerValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().alphanum().min(6).required(),
    hotelID: Joi.string().min(2).required(),
  });

  return schema.validate(data, {});
};

const loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().alphanum().min(6).required(),
  });

  return schema.validate(data, {});
};

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
