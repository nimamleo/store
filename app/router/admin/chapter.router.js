const {
    ChapterController,
} = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.get("/list/:courseId", ChapterController.chapterOfCourse);
router.patch("/remove/:chapterId", ChapterController.removeChapterById);
router.patch("/edit/:chapterId", ChapterController.updateChapterById);

module.exports = {
    AdminApiChapterRouter: router,
};
