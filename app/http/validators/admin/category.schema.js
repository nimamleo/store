const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constant");
const addCategorySchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .error(new Error("category title is not valid")),
    parent: Joi.string()
        .allow("")
        .pattern(MongoIDPattern)
        .allow("")
        .error(new Error("id is not valid")),
});
const updateCategorySchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .error(new Error("category title is not valid")),
});

module.exports = {
    addCategorySchema,
    updateCategorySchema,
};
