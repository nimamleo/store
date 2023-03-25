const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constant");
const addProductSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    text: Joi.string(),
    short_text: Joi.string(),
    tags: Joi.array().min(0).max(20),
    category: Joi.string().regex(MongoIDPattern),
    price: Joi.number(),
    discount: Joi.number(),
    count: Joi.number(),
    weight: Joi.number().allow(null, 0, "0"),
    length: Joi.number().allow(null, 0, "0"),
    height: Joi.number().allow(null, 0, "0"),
    width: Joi.number().allow(null, 0, "0"),
    colors: Joi.string().allow(""),
    type: Joi.string().regex(/(virtual|phisical)/i),

    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/),
    fileUploadPath: Joi.allow(),
});

module.exports = {
    addProductSchema,
};
