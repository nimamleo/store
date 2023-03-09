const Controller = require(".././controller");
const { addBlogSchema } = require("../../validators/admin/blog.schema");
const path = require("path");
const { BlogModel } = require("../../../models/blog.model");
const { deleteFileInPublic } = require("../../../utils/functions");

class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            const blogDataBody = await addBlogSchema.validateAsync(req.body);
            req.body.image = path
                .join(blogDataBody.fileUploadPath, blogDataBody.fileName)
                .split("\\")
                .join("/");
            const { title, text, short_text, image, category, tags } =
                blogDataBody;
            const blog = await BlogModel.create({
                title,
                text,
                short_text,
                image,
                category,
                tags,
            });
            return res.json({ blogDataBody, image: req.body.image });
        } catch (err) {
            deleteFileInPublic(req.body.image)
            next(err);
        }
    }
    async getOneBlogById(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
    async getListsOfBlogs(req, res, next) {
        try {
            res.status(200).json({
                stausCode: 200,
                data: {
                    blogs: [],
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async commentsOfBlog(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
    async deleteBlogById(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
    async updateBlogById(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    AdminBlogController: new BlogController(),
};
