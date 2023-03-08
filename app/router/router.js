const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRouter } = require("./user/auth.router");
const { AdminRoutes } = require("./admin/admin.routes");

const router = require("express").Router();
router.use("/user", UserAuthRouter);
router.use("/admin", AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/", HomeRoutes);
module.exports = {
    AllRoutes: router,
};
