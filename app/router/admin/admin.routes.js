const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constant");
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

router.use(
    "/category",
    checkPermission([PERMISSIONS.CONTENT_MANAGER]),
    AdminApiCategoryRouter
);
router.use(
    "/blogs",
    checkPermission([PERMISSIONS.TEACHER]),
    AdminApiBlogRouter
);
router.use(
    "/products",
    checkPermission([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]),
    AdminApiProductRouter
);
router.use(
    "/courses",
    checkPermission([PERMISSIONS.TEACHER]),
    AdminApiCourseRouter
);
router.use(
    "/chapter",
    checkPermission([PERMISSIONS.TEACHER]),
    AdminApiChapterRouter
);
router.use(
    "/episode",
    checkPermission([PERMISSIONS.TEACHER]),
    AdminApiEpisodeRouter
);
router.use(
    "/permission",
    checkPermission([PERMISSIONS.ADMIN]),
    AdminApiPermissionRouter
);
router.use("/role", checkPermission([PERMISSIONS.ADMIN]), AdminApiRoleRouter);
router.use("/user", checkPermission([PERMISSIONS.USER]), AdminApiUserRouter);
module.exports = {
    AdminRoutes: router,
};
