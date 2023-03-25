const { AdminApiBlogRouter } = require("./blog.routers");
const { AdminApiCategoryRouter } = require("./category.router");
const { AdminApiChapterRouter } = require("./chapter.router");
const { AdminApiCourseRouter } = require("./course.router");
const { AdminApiProductRouter } = require("./product.router");

const router = require("express").Router();

router.use("/category", AdminApiCategoryRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/products", AdminApiProductRouter);
router.use("/courses", AdminApiCourseRouter);
router.use("/chapter", AdminApiChapterRouter);

module.exports = {
    AdminRoutes: router,
};
