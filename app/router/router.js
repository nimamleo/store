const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRouter } = require("./user/auth.router");
const { AdminRoutes } = require("./admin/admin.routes");
const { VerifyAccessToken } = require("../http/middlewares/VerifyAccessToken");
const { graphqlHTTP } = require("express-graphql");
const { graphqlConfig } = require("../utils/graphql.config");

const router = require("express").Router();
router.use("/user", UserAuthRouter);
router.use("/admin", VerifyAccessToken, AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/", HomeRoutes);
module.exports = {
    AllRoutes: router,
};
