const { HomeRoutes } = require("./api");
const { UserAuthRouter } = require("./user/auth.router");

const router = require("express").Router();
router.use("/user", UserAuthRouter);
router.use("/", HomeRoutes);
module.exports = {
    AllRoutes: router,
};
