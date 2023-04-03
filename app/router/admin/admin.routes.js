const { AdminApiBlogRouter } = require("./blog.routers");
const { AdminApiCategoryRouter } = require("./category.router");
const { AdminApiChapterRouter } = require("./chapter.router");
const { AdminApiCourseRouter } = require("./course.router");
const { AdminApiEpisodeRouter } = require("./episode.router");
const { AdminApiPermissionRouter } = require("./permission.router");
const { AdminApiProductRouter } = require("./product.router");
const { AdminApiRoleRouter } = require("./role.router");
const { AdminApiUserRouter } = require("./user.router");

const router = require("express").Router();

router.use("/category", AdminApiCategoryRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/products", AdminApiProductRouter);
router.use("/courses", AdminApiCourseRouter);
router.use("/chapter", AdminApiChapterRouter);
router.use("/episode", AdminApiEpisodeRouter);
router.use("/user", AdminApiUserRouter);
router.use("/role", AdminApiRoleRouter);
router.use("/permission", AdminApiPermissionRouter);

module.exports = {
    AdminRoutes: router,
};
