const homeController = require("../../http/controllers/api/home.controller");
const {
    VerifyAccessToken,
} = require("../../http/middlewares/VerifyAccessToken");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: indexpage routes
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description : get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer yourToken....
 *      responses:
 *          200:
 *              description: success
 *              schema:
 *                  type: string
 *                  example : Index Page Store
 *          404:
 *              description: not Found
 */
router.get("/", VerifyAccessToken, homeController.indexPage);

module.exports = {
    HomeRoutes: router,
};
