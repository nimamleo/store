const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constant");
const addBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    text: Joi.string(),
    short_text: Joi.string(),
    tags: Joi.array().min(0).max(20),
    category: Joi.string().pattern(MongoIDPattern),
    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/),
    fileUploadPath: Joi.allow(),
});

module.exports = {
    addBlogSchema,
};
