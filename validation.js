// Validations
const Joi = require('@hapi/joi');

// Register Validation schema

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().max(25).required().email(),
        password: Joi.string().min(8).max(16).required(),
        date: Joi.date()
    });

    const {error} = schema.validate(data);
    return error;
}
// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().max(25).required().email(),
        password: Joi.string().min(8).max(16).required(),
    });

    const {error} = schema.validate(data);
    return error;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
