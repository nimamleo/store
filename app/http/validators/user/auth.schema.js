const Joi = require("@hapi/joi");
const joi = require("@hapi/joi");
const authSchema = joi.object({
    email: joi.string().lowercase().trim().email().required(),
    password: Joi.string().min(6).max(16).trim().required(),
});



module.exports = {
    authSchema
}