const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
const { addEpisodeSchema } = require("../../../validators/admin/course.schema");

class EpisodeController extends Controller {
    async addNewEpisode(req, res, next) {
        try {
            const { title, time, text, chapterId, courseId } =
                await addEpisodeSchema.validateAsync(req.body);
            
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    EpisodeController: new EpisodeController(),
};
