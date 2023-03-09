const { authSchema } = require("../../validators/user/auth.schema");
const createHttpError = require("http-errors");
const Controller = require("../controller");

module.exports = new (class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(200).send("index page store");
        } catch (err) {
            next(err);
        }
    }
})();
