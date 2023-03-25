const {
    CourseController,
} = require("../../http/controllers/admin/course/course.controller");
const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add", EpisodeController.addNewEpisode);



module.exports = {
    AdminApiEpisodeRouter: router,
};
