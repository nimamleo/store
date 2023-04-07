const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constant");
const addRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(30),
    permissions: Joi.array().items(Joi.string().pattern(MongoIDPattern)),
});
const addPermissionSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(30),
});

module.exports = {
    addRoleSchema,
    addPermissionSchema,
};
