const {
    CourseController,
} = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/list", CourseController.getListOfCourse);

router.get("/:id", CourseController.getOneCourse);

router.post(
    "/add",
    uploadFile.single("image", 10),
    stringToArray("tags"),
    CourseController.addCourse
);


module.exports = {
    AdminApiCourseRouter: router,
};
