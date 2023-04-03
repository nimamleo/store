const {
    CourseController,
} = require("../../http/controllers/admin/course/course.controller");
const {
    EpisodeController,
} = require("../../http/controllers/admin/course/episode.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile, uploadVideo } = require("../../utils/multer");

const router = require("express").Router();

router.post(
    "/add",
    uploadVideo.single("video"),
    EpisodeController.addNewEpisode
);
router.delete("/remove/:episodeId", EpisodeController.removeEpisode);
router.patch(
    "/update/:episodeId",
    uploadVideo.single("video"),
    EpisodeController.updateEpisode
);

module.exports = {
    AdminApiEpisodeRouter: router,
};
