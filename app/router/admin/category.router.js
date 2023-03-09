const {
    CategoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(Admin-Panel)]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", CategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all parents of category heads
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents", CategoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all categories children
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent", CategoryController.getChildOfParents);
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all categories
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all", CategoryController.getAllCategory);
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(Admin-Panel)]
 *          summary: remove category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/remove/:id", CategoryController.removeCategory);
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all category with out using populate and snested structure
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list-of-all", CategoryController.getAllcategoryWithoutPopulate);
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", CategoryController.getCategoryById);
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(Admin-Panel)]
 *          summary: update category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: internallServerError
 */
router.patch("/update/:id", CategoryController.editCategory);

module.exports = {
    CategoryRoutes: router,
};
