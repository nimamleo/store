const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constant");

const ObjectIdValidator = Joi.object({
    id: Joi.string()
        .pattern(MongoIDPattern)
        .error(new Error(createHttpError.BadRequest("id is not valid"))),
});


module.exports = {
    ObjectIdValidator
}