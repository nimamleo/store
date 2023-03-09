const Controller = require(".././controller");
const {
    addBlogSchema,
    // updateCategorySchema,
} = require("../../validators/admin/blog.schema");
const path = require("path");
const { BlogModel } = require("../../../models/blog.model");
const { deleteFileInPublic } = require("../../../utils/functions");
const createHttpError = require("http-errors");

class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            const blogDataBody = await addBlogSchema.validateAsync(req.body);
            req.body.image = path
                .join(blogDataBody.fileUploadPath, blogDataBody.fileName)
                .split("\\")
                .join("/");
            const { title, text, short_text, category, tags } = blogDataBody;
            const image = req.body.image;
            const author = req.user._id;
            const blog = await BlogModel.create({
                title,
                text,
                short_text,
                image,
                category,
                tags,
                author,
            });
            return res.status(201).json({
                message: "blog created successfully",
                statusCode: 201,
                data: {
                    blog,
                },
            });
        } catch (err) {
            deleteFileInPublic(req.body.image);
            next(err);
        }
    }
    async getOneBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.findBlog(id);
            res.status(200).json({
                statusCode: 200,
                data: { blog },
            });
        } catch (err) {
            next(err);
        }
    }
    async getListsOfBlogs(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match: {},
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: "$author",
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $unwind: "$category",
                },
                {
                    $project: {
                        "author.__v": 0,
                        "category.__v": 0,
                        "author.otp": 0,
                        "author.bills": 0,
                        "author.roles": 0,
                        "author.discount": 0,
                        "author.birthday": 0,
                    },
                },
            ]);
            res.status(200).json({
                stausCode: 200,
                data: {
                    blogs,
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
            const { id } = req.params;
            await this.findBlog(id);
            const deleteResult = await BlogModel.deleteOne({ _id: id });
            if (deleteResult.deletedCount == 0)
                throw createHttpError.InternalServerError("can not delete");
            return res.status(200).json({
                statusCode: 200,
                message: "blog deleted",
            });
        } catch (err) {
            next(err);
        }
    }
    async updateBlogById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog(id);
            if (req?.body?.fileUploadPath && req?.body?.fileName) {
                req.body.image = path
                    .join(req.body.fileUploadPath, req.body.fileName)
                    .split("\\")
                    .join("/");
            }
            const data = req.body;
            const nullishData = ["", " ", undefined, null, NaN, 0];
            const blackListData = [
                "bookmarks",
                "dislikes",
                "likes",
                "comments",
                "author",
            ];
            Object.keys(data).forEach((key) => {
                if (blackListData.includes(data[key])) delete data[key];
                if (typeof data[key] == "string") data[key] = data[key].trim();
                if (Array.isArray(data[key]) && Array.length > 0)
                    data[key] = data[key].map((item) => item.trim());
                if (nullishData.includes(data[key])) delete data[key];
            });
            const updateResult = await BlogModel.updateOne(
                { _id: id },
                { $set: data }
            );
            if (updateResult.modifiedCount == 0)
                throw createHttpError.InternalServerError("update failed");
            res.status(200).json({
                statusCode: 200,
                message: "blog updated",
            });
        } catch (err) {
            deleteFileInPublic(req?.body?.image);
            next(err);
        }
    }

    async findBlog(id) {
        const blog = await BlogModel.findById(id).populate([
            { path: "category", select: ["title"] },
            {
                path: "author",
                select: ["mobile", "first_name", "last_name", "username"],
            },
        ]);
        if (!blog) throw createHttpError.NotFound("blog not found");
        return blog;
    }
}

module.exports = {
    AdminBlogController: new BlogController(),
};
