const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constant");
const addCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    text: Joi.string(),
    short_text: Joi.string(),
    tags: Joi.array().min(0).max(20),
    category: Joi.string().regex(MongoIDPattern),
    price: Joi.number(),
    discount: Joi.number(),
    type: Joi.string().regex(/(free| cash | special)/i),

    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/),
    fileUploadPath: Joi.allow(),
});

const addEpisodeSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    text: Joi.string(),
    type: Joi.string().regex(/(lock| unlock)/i),
    chapterId: Joi.string().regex(MongoIDPattern),
    courseId: Joi.string().regex(MongoIDPattern),

    fileName: Joi.string().pattern(/(\.mp4|\.mkv|\.mov|\.mpg|\.avi)$/),
    fileUploadPath: Joi.allow(),
});

module.exports = {
    addCourseSchema,
    addEpisodeSchema,
};
