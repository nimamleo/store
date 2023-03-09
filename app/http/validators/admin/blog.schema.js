const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constant");
const addBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    text: Joi.string(),
    short_text: Joi.string(),
    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/),
    tags: Joi.array().min(0).max(20),
    category: Joi.string().pattern(MongoIDPattern),
    fileUploadPath: Joi.allow(),
});
// const updateCategorySchema = Joi.object({
//     title: Joi.string().min(3).max(30),
//     text: Joi.string(),
//     short_text: Joi.string(),
//     tags: Joi.array().min(0).max(20),
//     category: Joi.string().pattern(MongoIDPattern),
// });

module.exports = {
    addBlogSchema,
    // updateCategorySchema,
};