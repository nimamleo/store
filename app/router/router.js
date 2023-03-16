const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRouter } = require("./user/auth.router");
const { AdminRoutes } = require("./admin/admin.routes");
const {
    VerifyAccessToken,
    checkRole,
} = require("../http/middlewares/VerifyAccessToken");

const router = require("express").Router();
router.use("/user", UserAuthRouter);
router.use("/admin", VerifyAccessToken, checkRole("ADMIN"), AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/", HomeRoutes);
module.exports = {
    AllRoutes: router,
};
