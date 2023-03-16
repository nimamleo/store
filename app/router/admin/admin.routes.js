const { AdminApiBlogRouter } = require("./blog.routers");
const { AdminApiCategoryRouter } = require("./category.router");
const { AdminApiProductRouter } = require("./product.router");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin (add-remove-del-edit)
 *      -   name: product(Admin-Panel)
 *          description: CRUD op for product
 *      -   name: Category(Admin-Panel)
 *          description: CRUD op for category
 *      -   name: Blog(Admin-Panel)
 *          description: CRUD op for blog
 */
router.use("/category", AdminApiCategoryRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/products", AdminApiProductRouter);

module.exports = {
    AdminRoutes: router,
};
