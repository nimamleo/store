const { authSchema } = require("../../validators/user/auth.schema");
const createError = require("http-errors");
const Controller = require("../controller");

module.exports = new (class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body);
            return res.status(200).send("index page store");
        } catch (err) {
            next(createError.BadRequest(err.message));
        }
    }
})();
