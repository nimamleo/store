const { BlogRoutes } = require("./blog.routers");
const { CategoryRoutes } = require("./category.router");
const {
    VerifyAccessToken,
} = require("../../http/middlewares/VerifyAccessToken");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin (add-remove-del-edit)
 *      -   name: Category(Admin-Panel)
 *          description: CRUD op for category
 */
router.use("/category", CategoryRoutes);
router.use("/blogs", VerifyAccessToken, BlogRoutes);

module.exports = {
    AdminRoutes: router,
};
