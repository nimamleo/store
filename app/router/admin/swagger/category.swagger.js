/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the title of category
 */
/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new category title
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              httpStatus.CREATED:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All children of Parents Category
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              httpStatus.OK:
 *                  description: success
 */
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
 *              httpStatus.OK:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All Categories
 *          responses:
 *              httpStatus.OK:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summary: remove category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              httpStatus.OK:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get all categories without populate and nested structure
 *          responses:
 *              httpStatus.OK:
 *                  description: success
 */
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
 *              httpStatus.OK:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit or update category title with object id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              httpStatus.OK:
 *                  description: success
 *              500:
 *                  description: internalServerErorr
 */