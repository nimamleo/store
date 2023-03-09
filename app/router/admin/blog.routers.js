const {
    AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE5MDA0NjEzMSIsImlhdCI6MTY3ODM1Nzg4MywiZXhwIjoxNjc4MzYxNDgzfQ.GxLzNIxpjhbfDqPkiVcoNg9t2Lzy3ljzwo5lR93ALAQ
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/", AdminBlogController.getListsOfBlogs);

/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(AdminPanel)]
 *          summary: update blog document
 *          consumes:
 *              -    multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE5MDA0NjEzMSIsImlhdCI6MTY3ODM1Nzg4MywiZXhwIjoxNjc4MzYxNDgzfQ.GxLzNIxpjhbfDqPkiVcoNg9t2Lzy3ljzwo5lR93ALAQ
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || string || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              201:
 *                  description: success
 */
router.patch(
    "/update/:id",
    uploadFile.single("image"),
    stringToArray("tags"),
    AdminBlogController.updateBlogById
);
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create blog document
 *          consumes:
 *              -    multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE5MDA0NjEzMSIsImlhdCI6MTY3ODM1Nzg4MywiZXhwIjoxNjc4MzYxNDgzfQ.GxLzNIxpjhbfDqPkiVcoNg9t2Lzy3ljzwo5lR93ALAQ
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || string || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: success
 */
router.post(
    "/add",
    uploadFile.single("image"),
    stringToArray("tags"),
    AdminBlogController.createBlog
);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get blog by id
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE5MDA0NjEzMSIsImlhdCI6MTY3ODM1Nzg4MywiZXhwIjoxNjc4MzYxNDgzfQ.GxLzNIxpjhbfDqPkiVcoNg9t2Lzy3ljzwo5lR93ALAQ
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              -   200:
 *                      description: success
 *
 *
 */
router.get("/:id", AdminBlogController.getOneBlogById);
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          tags: [Blog(AdminPanel)]
 *          summary: remove blog by id
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE5MDA0NjEzMSIsImlhdCI6MTY3ODM2MTU4NiwiZXhwIjoxNjc4MzY1MTg2fQ.wHtPF_03Ocij37yHHtWLvQs7n3Izfx32CHN7nuF7QHo
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              -   200:
 *                      description: success
 *
 *
 */
router.delete("/:id", AdminBlogController.deleteBlogById);

module.exports = {
    BlogRoutes: router,
};
